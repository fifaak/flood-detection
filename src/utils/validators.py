"""
Validation utilities for FloodGuard application.
"""
from typing import List, Tuple
from ..models.saint_venant import FloodParameters
from .config import config


class ParameterValidator:
    """Validates flood prediction parameters."""
    
    @staticmethod
    def validate_parameters(params: FloodParameters) -> Tuple[bool, List[str]]:
        """
        Validate all flood parameters.
        
        Args:
            params: FloodParameters object to validate
            
        Returns:
            Tuple[bool, List[str]]: (is_valid, list_of_errors)
        """
        errors = []
        
        # Validate initial depth
        if not (config.MIN_INITIAL_DEPTH <= params.initial_depth <= config.MAX_INITIAL_DEPTH):
            errors.append(
                f"ความลึกเริ่มต้นต้องอยู่ระหว่าง {config.MIN_INITIAL_DEPTH} - {config.MAX_INITIAL_DEPTH} ม."
            )
        
        # Validate total distance
        if not (config.MIN_TOTAL_DISTANCE <= params.total_distance <= config.MAX_TOTAL_DISTANCE):
            errors.append(
                f"ระยะทางรวมต้องอยู่ระหว่าง {config.MIN_TOTAL_DISTANCE} - {config.MAX_TOTAL_DISTANCE} ม."
            )
        
        # Validate segments
        if not (config.MIN_SEGMENTS <= params.segments <= config.MAX_SEGMENTS):
            errors.append(
                f"จำนวนช่วงต้องอยู่ระหว่าง {config.MIN_SEGMENTS} - {config.MAX_SEGMENTS}"
            )
        
        # Validate Manning's n
        if not (config.MIN_MANNING_N <= params.manning_n <= config.MAX_MANNING_N):
            errors.append(
                f"ค่า Manning's n ต้องอยู่ระหว่าง {config.MIN_MANNING_N} - {config.MAX_MANNING_N}"
            )
        
        # Validate bank level
        if not (config.MIN_BANK_LEVEL <= params.bank_level <= config.MAX_BANK_LEVEL):
            errors.append(
                f"ระดับตลิ่งต้องอยู่ระหว่าง {config.MIN_BANK_LEVEL} - {config.MAX_BANK_LEVEL} ม."
            )
        
        # Validate depth gradient
        if not (config.MIN_DEPTH_GRADIENT <= params.depth_gradient <= config.MAX_DEPTH_GRADIENT):
            errors.append(
                f"ค่า dy/dx ต้องอยู่ระหว่าง {config.MIN_DEPTH_GRADIENT} - {config.MAX_DEPTH_GRADIENT}"
            )
        
        # Validate channel depth
        if not (config.MIN_CHANNEL_DEPTH <= params.channel_depth <= config.MAX_CHANNEL_DEPTH):
            errors.append(
                f"ความลึกร่องน้ำต้องอยู่ระหว่าง {config.MIN_CHANNEL_DEPTH} - {config.MAX_CHANNEL_DEPTH} ม."
            )
        
        return len(errors) == 0, errors
    
    @staticmethod
    def validate_physical_constraints(params: FloodParameters) -> Tuple[bool, List[str]]:
        """
        Validate physical constraints between parameters.
        
        Args:
            params: FloodParameters object to validate
            
        Returns:
            Tuple[bool, List[str]]: (is_valid, list_of_warnings)
        """
        warnings = []
        
        # Check if initial depth is reasonable compared to bank level
        if params.initial_depth > params.bank_level:
            warnings.append(
                "ความลึกเริ่มต้นสูงกว่าระดับตลิ่ง - อาจเกิดน้ำท่วมตั้งแต่จุดเริ่มต้น"
            )
        
        # Check if channel depth is reasonable
        if params.channel_depth < params.initial_depth:
            warnings.append(
                "ความลึกร่องน้ำน้อยกว่าความลึกเริ่มต้น - ตรวจสอบความถูกต้องของข้อมูล"
            )
        
        # Check for extreme gradient values
        if abs(params.depth_gradient) > 0.01:
            warnings.append(
                "ค่า dy/dx มีค่าสูง - อาจส่งผลให้การคาดการณ์ไม่แม่นยำ"
            )
        
        return len(warnings) == 0, warnings