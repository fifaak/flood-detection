"""
Configuration settings for FloodGuard application.
"""
from dataclasses import dataclass
from typing import Dict, Any


@dataclass
class AppConfig:
    """Application configuration settings."""
    
    # Page configuration
    PAGE_TITLE: str = "FloodGuard: ระบบคาดการณ์ระดับน้ำท่วม"
    PAGE_ICON: str = "🌊"
    LAYOUT: str = "wide"
    INITIAL_SIDEBAR_STATE: str = "expanded"
    
    # Default parameter values
    DEFAULT_INITIAL_DEPTH: float = 0.3
    DEFAULT_TOTAL_DISTANCE: int = 7000
    DEFAULT_SEGMENTS: int = 14
    DEFAULT_MANNING_N: float = 0.04
    DEFAULT_BANK_LEVEL: float = 1.497
    DEFAULT_DEPTH_GRADIENT: float = 0.001
    DEFAULT_CHANNEL_DEPTH: float = 1.0
    
    # Validation limits
    MIN_INITIAL_DEPTH: float = 0.0
    MAX_INITIAL_DEPTH: float = 10.0
    MIN_TOTAL_DISTANCE: int = 100
    MAX_TOTAL_DISTANCE: int = 50000
    MIN_SEGMENTS: int = 5
    MAX_SEGMENTS: int = 50
    MIN_MANNING_N: float = 0.01
    MAX_MANNING_N: float = 0.1
    MIN_BANK_LEVEL: float = 0.5
    MAX_BANK_LEVEL: float = 5.0
    MIN_DEPTH_GRADIENT: float = -0.1
    MAX_DEPTH_GRADIENT: float = 0.1
    MIN_CHANNEL_DEPTH: float = 0.1
    MAX_CHANNEL_DEPTH: float = 10.0
    
    # Graph settings
    GRAPH_HEIGHT: int = 500
    WATER_LEVEL_COLOR: str = "blue"
    BANK_LEVEL_COLOR: str = "red"
    FLOOD_RISK_COLOR: str = "red"
    FLOOD_RISK_OPACITY: float = 0.1


# Global configuration instance
config = AppConfig()