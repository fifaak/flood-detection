# FloodGuard Architecture Documentation

## 🏗️ Project Structure

### Clean Architecture Principles

The project follows clean architecture principles with clear separation of concerns:

```
src/
├── models/          # Business Logic Layer
├── ui/              # Presentation Layer  
└── utils/           # Infrastructure Layer
```

### Layer Responsibilities

#### 1. Models Layer (`src/models/`)
- **Purpose**: Contains core business logic and mathematical computations
- **Files**:
  - `saint_venant.py`: Saint-Venant equation solver using Euler's method
- **Key Classes**:
  - `FloodParameters`: Data class for input parameters
  - `FloodResults`: Data class for calculation results
  - `SaintVenantSolver`: Core solver implementation

#### 2. UI Layer (`src/ui/`)
- **Purpose**: Handles user interface and presentation logic
- **Files**:
  - `components.py`: Streamlit UI components
- **Key Classes**:
  - `InputComponents`: Handles sidebar input forms
  - `DisplayComponents`: Handles main area displays

#### 3. Utils Layer (`src/utils/`)
- **Purpose**: Provides supporting utilities and configuration
- **Files**:
  - `config.py`: Application configuration settings
  - `validators.py`: Parameter validation logic
- **Key Classes**:
  - `AppConfig`: Configuration data class
  - `ParameterValidator`: Validation utilities

## 🔄 Data Flow

```
User Input → Validation → Solver → Results → Display
     ↓           ↓          ↓        ↓        ↓
InputComponents → ParameterValidator → SaintVenantSolver → FloodResults → DisplayComponents
```

## 🧪 Testing Strategy

### Unit Tests
- **Location**: `tests/`
- **Coverage**: Core business logic in models layer
- **Framework**: Python unittest
- **Key Test Cases**:
  - Parameter validation
  - Euler method calculations
  - Flood risk detection
  - Edge cases and error handling

### Test Philosophy
- Test business logic, not UI
- Focus on mathematical correctness
- Validate edge cases and error conditions
- Ensure type safety and data integrity

## 📐 Mathematical Implementation

### Saint-Venant Equation
The simplified Saint-Venant equation for gradually varied unsteady flow:

```
dy/dx = f(x, y, Q, ...)
```

### Euler's Method Implementation
```python
for i in range(1, n + 1):
    y[i] = y[i-1] + (dy/dx) * Δx
    W[i] = y[i] + z
```

### Flood Detection Logic
```python
flood_risk = max(W[i]) > z
```

## 🔧 Configuration Management

### Centralized Configuration
- All settings in `src/utils/config.py`
- Type-safe configuration with dataclasses
- Environment-specific overrides possible
- Default values for all parameters

### Validation Rules
- Parameter bounds checking
- Physical constraint validation
- User-friendly error messages
- Warning system for edge cases

## 🎨 UI Design Patterns

### Component-Based Architecture
- Reusable UI components
- Separation of input and display logic
- Consistent styling and behavior
- Responsive design principles

### State Management
- Streamlit session state for persistence
- Reactive updates on parameter changes
- Error state handling
- Loading states for calculations

## 🚀 Deployment Considerations

### Development Environment
```bash
# Setup
python -m venv flood_prediction_env
pip install -r requirements-dev.txt

# Testing
make test
make lint

# Running
make run
```

### Production Deployment
- Containerization ready (Docker)
- Environment variable configuration
- Logging and monitoring hooks
- Performance optimization

## 🔍 Code Quality Standards

### Style Guidelines
- PEP 8 compliance
- Type hints throughout
- Comprehensive docstrings
- Meaningful variable names

### Documentation
- Inline code comments
- API documentation
- Architecture documentation
- User guides

### Error Handling
- Graceful error recovery
- User-friendly error messages
- Logging for debugging
- Input validation

## 🔄 Future Extensibility

### Plugin Architecture
- Easy to add new solvers
- Configurable UI components
- Extensible validation rules
- Multiple output formats

### Scalability Considerations
- Async processing capability
- Batch calculation support
- API endpoint ready
- Database integration ready

## 📊 Performance Considerations

### Optimization Strategies
- NumPy vectorization
- Efficient memory usage
- Lazy loading of components
- Caching of calculations

### Monitoring
- Calculation time tracking
- Memory usage monitoring
- Error rate tracking
- User interaction analytics