# Flood Prediction App - React Native

แอปพลิเคชันคาดการณ์ระดับน้ำและโอกาสการเกิดน้ำท่วมสำหรับ Android

## คุณสมบัติ

- 🌊 คาดการณ์ระดับน้ำตามข้อมูลอุทกวิทยา
- 📊 แสดงกราฟระดับน้ำแบบเรียลไทม์
- 🚨 แจ้งเตือนโอกาสการเกิดน้ำท่วม
- 📱 รองรับ Android
- 🎨 UI ที่เข้าใจง่าย ไม่แสดงสูตรคณิตศาสตร์

## การติดตั้ง

1. ติดตั้ง dependencies:
```bash
npm install
```

2. รัน Android:
```bash
npm run android
```

หรือรันด้วย Expo:
```bash
npm start
```
แล้วกด 'a' เพื่อเปิดใน Android emulator

## โครงสร้างโปรเจค

```
flood-detection/
├── src/
│   ├── components/          # UI Components
│   │   ├── Header.js
│   │   ├── InputSection.js
│   │   ├── StatusCard.js
│   │   ├── MetricsGrid.js
│   │   ├── WaterLevelChart.js
│   │   ├── InfoSection.js
│   │   └── index.js
│   ├── utils/              # Business logic
│   │   └── calculations.js
│   ├── constants/          # Data & constants
│   │   └── floodData.js
│   └── styles/             # Theme & styling
│       └── theme.js
├── App.js                  # Main app entry
├── package.json
└── app.json
```

## การใช้งาน

1. เลือกปีข้อมูล (2565-2568)
2. เลือกระดับตลิ่ง (1.5-20.0 เมตร)
3. ดูผลการคาดการณ์และกราฟ

## เทคโนโลยีที่ใช้

- React Native
- Expo
- **Gluestack UI** - Modern component library
- react-native-chart-kit (สำหรับกราฟ)
- react-native-picker-select (สำหรับ dropdown)

## หมายเหตุ

แอปนี้ migrate มาจาก Python/Streamlit โดยใช้หลักการคำนวณเดียวกัน แต่ปรับ UI ให้เหมาะกับผู้ใช้ทั่วไปที่ไม่ต้องการเห็นสูตรคณิตศาสตร์
