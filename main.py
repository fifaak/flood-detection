"""
FloodGuard: ระบบคาดการณ์ระดับน้ำท่วม
Main application entry point using clean architecture.
"""
import streamlit as st
import sys
from pathlib import Path

# Add src to path for imports
sys.path.append(str(Path(__file__).parent / "src"))

from src.models.saint_venant import SaintVenantSolver
from src.ui.components import InputComponents, DisplayComponents
from src.utils.config import config
from src.utils.validators import ParameterValidator


class FloodGuardApp:
    """Main FloodGuard application class."""
    
    def __init__(self):
        """Initialize the application."""
        self._setup_page_config()
        self.input_components = InputComponents()
        self.display_components = DisplayComponents()
        self.validator = ParameterValidator()
    
    def _setup_page_config(self):
        """Configure Streamlit page settings."""
        st.set_page_config(
            page_title=config.PAGE_TITLE,
            page_icon=config.PAGE_ICON,
            layout=config.LAYOUT,
            initial_sidebar_state=config.INITIAL_SIDEBAR_STATE
        )
    
    def run(self):
        """Run the main application."""
        # Render header and model explanation
        self.display_components.render_header()
        self.display_components.render_model_explanation()
        
        # Get user input from sidebar
        parameters = self.input_components.render_sidebar()
        
        # Add calculate button
        st.sidebar.markdown("---")
        calculate_button = st.sidebar.button("🧮 คำนวณระดับน้ำ", type="primary")
        
        # Validate parameters
        is_valid, errors = self.validator.validate_parameters(parameters)
        has_warnings, warnings = self.validator.validate_physical_constraints(parameters)
        
        # Display validation errors
        if not is_valid:
            st.sidebar.error("❌ ข้อผิดพลาดในการตั้งค่า:")
            for error in errors:
                st.sidebar.error(f"• {error}")
            return
        
        # Display warnings
        if not has_warnings:
            st.sidebar.warning("⚠️ คำเตือน:")
            for warning in warnings:
                st.sidebar.warning(f"• {warning}")
        
        # Perform calculations when button is clicked or on first load
        if calculate_button or 'calculated' not in st.session_state:
            st.session_state.calculated = True
            
            try:
                # Initialize solver and calculate results
                solver = SaintVenantSolver(parameters)
                results = solver.solve_euler_method()
                flood_statuses = solver.get_flood_status_segments(results)
                
                # Display results
                self.display_components.render_metrics(results, parameters)
                self.display_components.render_flood_conclusion(results, parameters)
                self.display_components.render_results_table(results, flood_statuses)
                self.display_components.render_graph(results, parameters)
                self.display_components.render_calculation_details(parameters, results)
                
            except Exception as e:
                st.error(f"❌ เกิดข้อผิดพลาดในการคำนวณ: {str(e)}")
                st.info("กรุณาตรวจสอบค่าพารามิเตอร์และลองใหม่อีกครั้ง")
        
        # Render footer
        self.display_components.render_footer()


def main():
    """Main entry point."""
    app = FloodGuardApp()
    app.run()


if __name__ == "__main__":
    main()