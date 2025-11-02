"""
Unit tests for Saint-Venant solver.
"""
import unittest
import numpy as np
import sys
from pathlib import Path

# Add src to path
sys.path.append(str(Path(__file__).parent.parent / "src"))

from src.models.saint_venant import FloodParameters, SaintVenantSolver


class TestSaintVenantSolver(unittest.TestCase):
    """Test cases for SaintVenantSolver class."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.valid_params = FloodParameters(
            initial_depth=0.3,
            total_distance=7000,
            segments=14,
            manning_n=0.04,
            bank_level=1.497,
            depth_gradient=0.001,
            channel_depth=1.0
        )
        self.solver = SaintVenantSolver(self.valid_params)
    
    def test_calculate_delta_x(self):
        """Test delta_x calculation."""
        expected_delta_x = 7000 / 14
        actual_delta_x = self.solver.calculate_delta_x()
        self.assertAlmostEqual(actual_delta_x, expected_delta_x, places=2)
    
    def test_solve_euler_method_basic(self):
        """Test basic Euler method solution."""
        results = self.solver.solve_euler_method()
        
        # Check that we have the correct number of points
        self.assertEqual(len(results.distances), 15)  # n+1 points
        self.assertEqual(len(results.depths), 15)
        self.assertEqual(len(results.water_levels), 15)
        
        # Check initial conditions
        self.assertAlmostEqual(results.depths[0], 0.3, places=3)
        self.assertAlmostEqual(results.water_levels[0], 0.3 + 1.497, places=3)
        
        # Check that depths increase (positive gradient)
        self.assertGreater(results.depths[-1], results.depths[0])
    
    def test_solve_euler_method_negative_gradient(self):
        """Test Euler method with negative gradient."""
        params = FloodParameters(
            initial_depth=0.5,
            total_distance=1000,
            segments=10,
            manning_n=0.04,
            bank_level=1.5,
            depth_gradient=-0.001,
            channel_depth=1.0
        )
        solver = SaintVenantSolver(params)
        results = solver.solve_euler_method()
        
        # Check that depths decrease (negative gradient)
        self.assertLess(results.depths[-1], results.depths[0])
    
    def test_flood_risk_detection(self):
        """Test flood risk detection."""
        # Create parameters that should cause flooding
        flood_params = FloodParameters(
            initial_depth=2.0,  # High initial depth
            total_distance=1000,
            segments=10,
            manning_n=0.04,
            bank_level=1.5,  # Lower bank level
            depth_gradient=0.01,  # Positive gradient
            channel_depth=1.0
        )
        solver = SaintVenantSolver(flood_params)
        results = solver.solve_euler_method()
        
        self.assertTrue(results.flood_risk)
        self.assertGreater(results.max_water_level, flood_params.bank_level)
    
    def test_water_level_calculation(self):
        """Test water level calculation formula."""
        results = self.solver.solve_euler_method()
        
        # Check that Wi = yi + z for all points
        for i in range(len(results.distances)):
            expected_water_level = results.depths[i] + self.valid_params.bank_level
            self.assertAlmostEqual(results.water_levels[i], expected_water_level, places=6)
    
    def test_parameter_validation(self):
        """Test parameter validation."""
        # Test invalid initial depth
        with self.assertRaises(ValueError):
            invalid_params = FloodParameters(
                initial_depth=-0.1,  # Invalid negative depth
                total_distance=7000,
                segments=14,
                manning_n=0.04,
                bank_level=1.497,
                depth_gradient=0.001,
                channel_depth=1.0
            )
            SaintVenantSolver(invalid_params)
    
    def test_get_flood_status_segments(self):
        """Test flood status for segments."""
        results = self.solver.solve_euler_method()
        statuses = self.solver.get_flood_status_segments(results)
        
        self.assertEqual(len(statuses), len(results.water_levels))
        
        # All statuses should be either 'ปกติ' or 'เสี่ยงท่วม'
        for status in statuses:
            self.assertIn(status, ['ปกติ', 'เสี่ยงท่วม'])


if __name__ == '__main__':
    unittest.main()