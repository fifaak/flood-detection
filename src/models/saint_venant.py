"""
Saint-Venant equation implementation using Euler's method.
"""
import numpy as np
from typing import Tuple, List
from dataclasses import dataclass


@dataclass
class FloodParameters:
    """Data class for flood prediction parameters."""
    initial_depth: float  # y0 - ความลึกเริ่มต้นของน้ำ (ม.)
    total_distance: float  # L - ระยะทางรวมของลำน้ำ (ม.)
    segments: int  # n - จำนวนช่วงคำนวณ
    manning_n: float  # ค่าความขรุขระของร่องน้ำ
    bank_level: float  # z - ระดับตลิ่ง (ม.)
    depth_gradient: float  # dy/dx - อัตราการเปลี่ยนแปลงความลึก
    channel_depth: float  # S0 - ความลึกของร่องน้ำ (ม.)


@dataclass
class FloodResults:
    """Data class for flood prediction results."""
    distances: np.ndarray
    depths: np.ndarray
    water_levels: np.ndarray
    average_water_level: float
    max_water_level: float
    flood_risk: bool
    delta_x: float


class SaintVenantSolver:
    """
    Saint-Venant equation solver using Euler's method.
    
    This class implements the simplified gradually varied unsteady flow
    equation for water level prediction in rivers.
    """
    
    def __init__(self, parameters: FloodParameters):
        """
        Initialize the solver with flood parameters.
        
        Args:
            parameters: FloodParameters object containing all input values
        """
        self.params = parameters
        self._validate_parameters()
    
    def _validate_parameters(self) -> None:
        """Validate input parameters."""
        if self.params.initial_depth <= 0:
            raise ValueError("Initial depth must be positive")
        if self.params.total_distance <= 0:
            raise ValueError("Total distance must be positive")
        if self.params.segments <= 0:
            raise ValueError("Number of segments must be positive")
        if self.params.manning_n <= 0:
            raise ValueError("Manning's n must be positive")
        if self.params.bank_level <= 0:
            raise ValueError("Bank level must be positive")
    
    def calculate_delta_x(self) -> float:
        """
        Calculate the distance interval for each segment.
        
        Returns:
            float: Distance interval (Δx)
        """
        return self.params.total_distance / self.params.segments
    
    def solve_euler_method(self) -> FloodResults:
        """
        Solve the Saint-Venant equation using Euler's method.
        
        The method implements:
        - Step 1: Calculate Δx = L/n
        - Step 2: Calculate yi = yi-1 + (dy/dx) × Δx
        - Step 3: Calculate Wi = yi + z
        - Step 4: Calculate average water level
        - Step 5: Determine flood risk
        
        Returns:
            FloodResults: Complete results of the calculation
        """
        # Step 1: Calculate distance interval
        delta_x = self.calculate_delta_x()
        
        # Initialize arrays
        distances = np.linspace(0, self.params.total_distance, self.params.segments + 1)
        depths = np.zeros(self.params.segments + 1)
        water_levels = np.zeros(self.params.segments + 1)
        
        # Set initial conditions
        depths[0] = self.params.initial_depth
        water_levels[0] = self.params.initial_depth + self.params.bank_level
        
        # Step 2-3: Apply Euler's method
        for i in range(1, self.params.segments + 1):
            # Euler's method: yi = yi-1 + (dy/dx) × Δx
            depths[i] = depths[i-1] + self.params.depth_gradient * delta_x
            # Water level: Wi = yi + z (absolute water level)
            water_levels[i] = depths[i] + self.params.bank_level
        
        # Step 4: Calculate average water level
        average_water_level = np.mean(water_levels)
        
        # Step 5: Determine flood risk
        # According to requirements: flood when Wi > z
        # Since Wi = yi + z, this means flood when yi + z > z, i.e., yi > 0
        # This means any positive depth above reference causes flooding
        max_water_level = np.max(water_levels)
        flood_risk = bool(max_water_level > self.params.bank_level)
        
        return FloodResults(
            distances=distances,
            depths=depths,
            water_levels=water_levels,
            average_water_level=average_water_level,
            max_water_level=max_water_level,
            flood_risk=flood_risk,
            delta_x=delta_x
        )
    
    def get_flood_status_segments(self, results: FloodResults) -> List[str]:
        """
        Get flood status for each segment.
        
        Args:
            results: FloodResults object
            
        Returns:
            List[str]: Status for each segment ('ปกติ' or 'เสี่ยงท่วม')
        """
        return [
            'ปกติ' if w <= self.params.bank_level else 'เสี่ยงท่วม'
            for w in results.water_levels
        ]