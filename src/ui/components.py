"""
Streamlit UI components for FloodGuard application.
"""
import streamlit as st
import pandas as pd
import plotly.graph_objects as go
from typing import Dict, Any

from ..models.saint_venant import FloodParameters, FloodResults


class InputComponents:
    """Handles all input components in the sidebar."""
    
    @staticmethod
    def render_sidebar() -> FloodParameters:
        """
        Render the sidebar with input parameters.
        
        Returns:
            FloodParameters: User input parameters
        """
        st.sidebar.header("🔧 ตั้งค่าพารามิเตอร์")
        st.sidebar.markdown("---")
        
        # Input parameters with validation
        y0 = st.sidebar.number_input(
            "ความลึกเริ่มต้นของน้ำ (y₀) [ม.]",
            min_value=0.0,
            max_value=10.0,
            value=0.3,
            step=0.1,
            help="ความลึกของน้ำที่จุดเริ่มต้น (x=0)"
        )
        
        L = st.sidebar.number_input(
            "ระยะทางรวมของลำน้ำ (L) [ม.]",
            min_value=100,
            max_value=50000,
            value=7000,
            step=100,
            help="ระยะทางทั้งหมดของลำน้ำที่ต้องการคำนวณ"
        )
        
        n = st.sidebar.number_input(
            "จำนวนช่วงคำนวณ (n)",
            min_value=5,
            max_value=50,
            value=14,
            step=1,
            help="จำนวนช่วงที่แบ่งลำน้ำสำหรับการคำนวณ"
        )
        
        manning_n = st.sidebar.number_input(
            "ค่าความขรุขระของร่องน้ำ (Manning's n)",
            min_value=0.01,
            max_value=0.1,
            value=0.04,
            step=0.01,
            help="ค่าสัมประสิทธิ์ความขรุขระของผิวร่องน้ำ"
        )
        
        z = st.sidebar.number_input(
            "ระดับตลิ่ง (z) [ม.]",
            min_value=0.5,
            max_value=5.0,
            value=1.497,
            step=0.001,
            help="ระดับความสูงของตลิ่งน้ำ"
        )
        
        dydx = st.sidebar.number_input(
            "ค่า dy/dx (จากสมการ Saint-Venant)",
            min_value=-0.1,
            max_value=0.1,
            value=0.001,
            step=0.0001,
            format="%.4f",
            help="อัตราการเปลี่ยนแปลงความลึกตามระยะทาง"
        )
        
        S0 = st.sidebar.number_input(
            "ความลึกของร่องน้ำ (S₀) [ม.]",
            min_value=0.1,
            max_value=10.0,
            value=1.0,
            step=0.1,
            help="ความลึกเฉลี่ยของร่องน้ำ"
        )
        
        return FloodParameters(
            initial_depth=y0,
            total_distance=L,
            segments=n,
            manning_n=manning_n,
            bank_level=z,
            depth_gradient=dydx,
            channel_depth=S0
        )


class DisplayComponents:
    """Handles all display components in the main area."""
    
    @staticmethod
    def render_header():
        """Render the application header."""
        st.title("🌊 FloodGuard: ระบบคาดการณ์ระดับน้ำท่วม (จ.สระบุรี)")
        st.markdown("---")
    
    @staticmethod
    def render_model_explanation():
        """Render the mathematical model explanation."""
        with st.expander("📚 คำอธิบายโมเดลทางคณิตศาสตร์"):
            st.markdown("""
            ### หลักการทางคณิตศาสตร์
            
            **สมการ Saint-Venant (Simplified gradually varied unsteady flow)**
            - ใช้สำหรับคำนวณการไหลของน้ำในลำธารที่เปลี่ยนแปลงตามเวลา
            - เป็นสมการพื้นฐานในอุทกวิทยาสำหรับการคาดการณ์ระดับน้ำ
            
            **วิธีของออยเลอร์ (Euler's Method)**
            - วิธีการเชิงตัวเลขสำหรับแก้สมการเชิงอนุพันธ์
            - สูตร: $y_i = y_{i-1} + \\frac{dy}{dx} \\cdot \\Delta x$
            
            **การคำนวณระดับน้ำ**
            - $W_i = y_i + z$ (ระดับน้ำ = ความลึก + ระดับตลิ่ง)
            - การตัดสินใจน้ำท่วม: เมื่อ $W_i > z$ (ระดับตลิ่ง)
            """)
    
    @staticmethod
    def render_metrics(results: FloodResults, parameters: FloodParameters):
        """
        Render key metrics in columns.
        
        Args:
            results: FloodResults object
            parameters: FloodParameters object
        """
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.metric(
                label="ระดับน้ำสูงสุด",
                value=f"{results.max_water_level:.3f} ม.",
                delta=f"{results.max_water_level - parameters.bank_level:.3f} ม. จากระดับตลิ่ง"
            )
        
        with col2:
            st.metric(
                label="ระดับตลิ่ง",
                value=f"{parameters.bank_level:.3f} ม."
            )
        
        with col3:
            st.metric(
                label="ระดับน้ำเฉลี่ย",
                value=f"{results.average_water_level:.3f} ม."
            )
        
        with col4:
            st.metric(
                label="ช่วงระยะทาง (Δx)",
                value=f"{results.delta_x:.1f} ม."
            )
    
    @staticmethod
    def render_flood_conclusion(results: FloodResults, parameters: FloodParameters):
        """
        Render flood prediction conclusion.
        
        Args:
            results: FloodResults object
            parameters: FloodParameters object
        """
        st.markdown("---")
        st.subheader("🎯 ผลการคาดการณ์")
        
        if results.flood_risk:
            st.error(
                f"⚠️ **คาดการณ์ว่าจะเกิดน้ำท่วม!** "
                f"ระดับน้ำสูงสุด ({results.max_water_level:.3f} ม.) "
                f"เกินระดับตลิ่ง ({parameters.bank_level:.3f} ม.)"
            )
        else:
            st.success(
                f"✅ **คาดการณ์ว่าจะไม่เกิดน้ำท่วม** "
                f"ระดับน้ำสูงสุด ({results.max_water_level:.3f} ม.) "
                f"ไม่เกินระดับตลิ่ง ({parameters.bank_level:.3f} ม.)"
            )
    
    @staticmethod
    def render_results_table(results: FloodResults, flood_statuses: list):
        """
        Render results table.
        
        Args:
            results: FloodResults object
            flood_statuses: List of flood status for each segment
        """
        st.markdown("---")
        st.subheader("📊 ตารางสรุปผลการคำนวณ")
        
        results_df = pd.DataFrame({
            'ช่วงที่': range(len(results.distances)),
            'ระยะทาง (x) [ม.]': results.distances,
            'ความลึกน้ำ (yᵢ) [ม.]': results.depths,
            'ระดับน้ำคาดการณ์ (Wᵢ) [ม.]': results.water_levels,
            'สถานะ': flood_statuses
        })
        
        st.dataframe(
            results_df.round(3),
            use_container_width=True,
            hide_index=True
        )
    
    @staticmethod
    def render_graph(results: FloodResults, parameters: FloodParameters):
        """
        Render interactive graph.
        
        Args:
            results: FloodResults object
            parameters: FloodParameters object
        """
        st.markdown("---")
        st.subheader("📈 กราฟแสดงระดับน้ำตามระยะทาง")
        
        fig = go.Figure()
        
        # Water level prediction line
        fig.add_trace(go.Scatter(
            x=results.distances,
            y=results.water_levels,
            mode='lines+markers',
            name='ระดับน้ำคาดการณ์ (Wᵢ)',
            line=dict(color='blue', width=3),
            marker=dict(size=6)
        ))
        
        # Bank level line
        fig.add_hline(
            y=parameters.bank_level,
            line_dash="dash",
            line_color="red",
            annotation_text=f"ระดับตลิ่ง ({parameters.bank_level:.3f} ม.)",
            annotation_position="top right"
        )
        
        # Flood risk area
        if results.flood_risk:
            fig.add_hrect(
                y0=parameters.bank_level,
                y1=max(results.water_levels) * 1.1,
                fillcolor="red",
                opacity=0.1,
                annotation_text="พื้นที่เสี่ยงน้ำท่วม",
                annotation_position="top left"
            )
        
        fig.update_layout(
            title="การเปลี่ยนแปลงระดับน้ำตามระยะทาง",
            xaxis_title="ระยะทาง (ม.)",
            yaxis_title="ระดับน้ำ (ม.)",
            hovermode='x unified',
            showlegend=True,
            height=500
        )
        
        st.plotly_chart(fig, use_container_width=True)
    
    @staticmethod
    def render_calculation_details(parameters: FloodParameters, results: FloodResults):
        """
        Render detailed calculation information.
        
        Args:
            parameters: FloodParameters object
            results: FloodResults object
        """
        with st.expander("📋 รายละเอียดการคำนวณ"):
            st.markdown(f"""
            ### พารามิเตอร์ที่ใช้ในการคำนวณ:
            - **ความลึกเริ่มต้น (y₀):** {parameters.initial_depth} ม.
            - **ระยะทางรวม (L):** {parameters.total_distance:,} ม.
            - **จำนวนช่วง (n):** {parameters.segments} ช่วง
            - **ช่วงระยะทาง (Δx):** {results.delta_x:.1f} ม.
            - **อัตราการเปลี่ยนแปลง (dy/dx):** {parameters.depth_gradient:.4f}
            - **ระดับตลิ่ง (z):** {parameters.bank_level} ม.
            
            ### สูตรที่ใช้:
            - **วิธีออยเลอร์:** yᵢ = yᵢ₋₁ + (dy/dx) × Δx
            - **ระดับน้ำ:** Wᵢ = yᵢ + z
            - **ระดับน้ำเฉลี่ย:** W̄ = Σ(Wᵢ) / n
            """)
    
    @staticmethod
    def render_footer():
        """Render application footer."""
        st.markdown("---")
        st.markdown(
            """
            <div style='text-align: center; color: gray;'>
            🌊 FloodGuard: ระบบคาดการณ์ระดับน้ำท่วม | พัฒนาโดยใช้ Streamlit และ Python<br>
            อ้างอิงจากสมการ Saint-Venant และวิธีของออยเลอร์
            </div>
            """,
            unsafe_allow_html=True
        )