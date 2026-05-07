const rarityConfig = {
  blue: { label: "蓝色", title: "普通入门", chance: 0.65, className: "rarity-blue", colorClass: "blue" },
  pink: { label: "粉色", title: "进阶实用", chance: 0.28, className: "rarity-pink", colorClass: "pink" },
  gold: { label: "金色", title: "高级展示", chance: 0.07, className: "rarity-gold", colorClass: "gold" }
};

const modulePools = [
  {
    key: "controller",
    label: "主控核心",
    stopMs: 3500,
    pool: {
      blue: ["STM32F103C8T6", "Arduino UNO", "Arduino Nano", "STC89C52", "ESP8266", "CH32V003", "ATmega328P", "STM8S103F3P6"],
      pink: ["STM32F401CCU6", "STM32F411CEU6", "ESP32-WROOM", "RP2040", "STM32G030K8T6", "STM32L031K6T6", "GD32F103C8T6", "CH32V307"],
      gold: ["STM32F407VET6", "STM32H743", "ESP32-S3", "Raspberry Pi Pico W", "STM32G474RET6", "STM32L476RG", "Teensy 4.1", "ESP32-P4"]
    }
  },
  {
    key: "sensor",
    label: "感知模块",
    stopMs: 4200,
    pool: {
      blue: ["光敏电阻", "DHT11", "红外避障模块", "NTC温度传感器", "土壤湿度传感器", "倾斜开关", "霍尔传感器", "雨滴传感器"],
      pink: ["AHT20", "MPU6050", "超声波测距模块", "MQ气体传感器", "DS18B20", "BMP280", "TCS34725颜色传感器", "火焰传感器"],
      gold: ["BME280", "VL53L0X激光测距", "SHT31", "ICM20948姿态传感器", "BMI160", "PMS5003粉尘传感器", "SGP30空气质量传感器", "MLX90614红外测温"]
    }
  },
  {
    key: "display",
    label: "显示交互",
    stopMs: 4900,
    pool: {
      blue: ["LED + 蜂鸣器", "0.96寸 OLED", "四位数码管", "1602 LCD", "独立按键", "矩阵键盘", "电位器", "双位LED数码管"],
      pink: ["OLED + 按键", "MAX7219点阵屏", "WS2812 RGB灯带", "旋转编码器 + OLED", "1.3寸 OLED", "TM1637数码管", "12864 LCD", "RGB状态灯矩阵"],
      gold: ["TFT彩屏", "电子墨水屏", "触摸屏", "高清IPS彩屏", "圆形LCD屏", "HMI串口屏", "多功能旋钮屏", "小尺寸GUI彩屏"]
    }
  },
  {
    key: "communication",
    label: "通信模块",
    stopMs: 5600,
    pool: {
      blue: ["UART串口调试", "USB-TTL", "HC-05蓝牙", "DX-BT24蓝牙", "红外遥控接收", "NRF24L01", "软串口通信", "简单单线通信"],
      pink: ["ESP8266 WiFi", "ESP32 WiFi + BLE", "RS485通信", "CAN通信模块", "LoRa SX1278", "Zigbee模块", "BLE低功耗蓝牙", "Modbus RTU通信"],
      gold: ["WiFi云平台通信", "LoRa通信", "4G通信模块", "以太网通信模块", "NB-IoT通信", "MQTT物联网通信", "Matter智能家居通信", "双模WiFi + BLE网关"]
    }
  },
  {
    key: "storage",
    label: "存储模块",
    stopMs: 6300,
    pool: {
      blue: ["片内Flash", "EEPROM", "无外部存储", "参数保存在Flash", "AT24C02", "简单环形缓存", "串口日志输出", "RAM临时缓存"],
      pink: ["W25Q64 SPI Flash", "MicroSD卡模块", "AT24C02 EEPROM", "日志缓存系统", "W25Q128 SPI Flash", "I2C EEPROM", "FATFS文件系统", "CSV数据日志"],
      gold: ["大容量SPI Flash", "FRAM", "SD卡数据记录系统", "云端数据同步", "双存储冗余", "LittleFS文件系统", "数据压缩存储", "断电保护日志系统"]
    }
  },
  {
    key: "actuator",
    label: "执行器/输出模块",
    stopMs: 7000,
    pool: {
      blue: ["普通LED", "蜂鸣器", "小马达", "继电器", "震动提醒马达", "激光指示模块", "小风扇", "电磁铁模块"],
      pink: ["SG90舵机", "震动马达", "TB6612电机驱动", "RGB状态灯", "ULN2003步进电机驱动", "5V继电器模块", "有源蜂鸣器阵列", "直流电机调速"],
      gold: ["步进电机", "多路舵机控制", "闭环电机控制", "无刷电机驱动", "机械臂控制", "云台控制系统", "线性执行器", "多轴运动控制"]
    }
  }
];

const projectModes = {
  random: {
    label: "随机模式",
    weights: {}
  },
  environment: {
    label: "环境监测",
    weights: {
      sensor: ["DHT11", "NTC温度传感器", "DS18B20", "AHT20", "BMP280", "BME280", "SHT31", "MLX90614红外测温", "CCS811空气质量传感器"],
      display: ["0.96寸 OLED", "1.3寸 OLED", "1602 LCD", "I2C 1602 LCD", "OLED + 按键", "TFT彩屏", "2.4寸 ILI9341 TFT", "高清IPS彩屏"],
      communication: ["UART串口调试", "ESP8266 WiFi", "ESP32 WiFi + BLE", "WiFi云平台通信", "ESP-NOW无线通信", "LoRa通信"],
      storage: ["参数保存在Flash", "W25Q64 SPI Flash", "W25Q128 SPI Flash", "MicroSD卡模块", "TF卡座模块", "SD卡数据记录系统", "云端数据同步"],
      actuator: ["普通LED", "蜂鸣器", "RGB状态灯"]
    }
  },
  motionSense: {
    label: "姿态/震动检测",
    weights: {
      sensor: ["MPU6050", "ICM20948姿态传感器", "倾斜开关", "AS5600磁编码器"],
      display: ["0.96寸 OLED", "1.3寸 OLED", "OLED + 按键", "TFT彩屏"],
      communication: ["HC-05蓝牙", "DX-BT24蓝牙", "蓝牙BLE串口模块", "ESP32 WiFi + BLE"],
      storage: ["W25Q64 SPI Flash", "W25Q128 SPI Flash", "日志缓存系统", "FRAM", "MB85RC I2C FRAM"],
      actuator: ["蜂鸣器", "有源蜂鸣器", "震动马达", "RGB状态灯"]
    }
  },
  robotCar: {
    label: "智能小车/运动控制",
    weights: {
      controller: ["STM32F103C8T6", "STM32F401CCU6", "STM32F407VET6", "ESP32-WROOM", "GD32F103C8T6", "ESP32-C3"],
      sensor: ["红外避障模块", "超声波测距模块", "VL53L0X激光测距", "MPU6050", "霍尔开关", "AS5600磁编码器"],
      display: ["LED + 蜂鸣器", "OLED + 按键", "TFT彩屏"],
      communication: ["HC-05蓝牙", "DX-BT24蓝牙", "蓝牙BLE串口模块", "NRF24L01无线模块", "ESP32 WiFi + BLE"],
      storage: ["参数保存在Flash", "W25Q64 SPI Flash", "日志缓存系统", "小容量SPI Flash"],
      actuator: ["小马达", "SG90舵机", "TB6612电机驱动", "DRV8833电机驱动", "PCA9685舵机驱动", "步进电机", "多路舵机控制", "闭环电机控制"]
    }
  },
  desktopConsole: {
    label: "桌面控制台",
    weights: {
      controller: ["STM32F103C8T6", "RP2040", "ESP32-S3", "ESP32-C3", "STM32G030F6P6"],
      sensor: ["AHT20", "MPU6050", "BME280", "电位器", "APDS-9960手势传感器"],
      display: ["0.96寸 OLED", "1.3寸 OLED", "OLED + 按键", "MAX7219点阵屏", "旋转编码器 + OLED", "ST7735 TFT屏", "TFT彩屏", "电子墨水屏", "触摸屏", "Nextion串口屏"],
      communication: ["UART串口调试", "USB-TTL", "CH340 USB串口", "ESP32 WiFi + BLE", "蓝牙BLE串口模块"],
      storage: ["EEPROM", "24C32 EEPROM", "W25Q64 SPI Flash", "AT24C02 EEPROM", "FRAM", "MB85RC I2C FRAM"],
      actuator: ["普通LED", "双色LED", "蜂鸣器", "有源蜂鸣器", "RGB状态灯"]
    }
  },
  dataLogger: {
    label: "数据记录仪",
    weights: {
      controller: ["STM32F103C8T6", "STM32F401CCU6", "Raspberry Pi Pico W", "STM32F407VET6", "STM32L031K6"],
      sensor: ["AHT20", "MPU6050", "MQ气体传感器", "INA219电流传感器", "BME280", "SHT31", "ICM20948姿态传感器", "CCS811空气质量传感器"],
      display: ["0.96寸 OLED", "1.3寸 OLED", "OLED + 按键", "电子墨水屏", "1.54寸电子墨水屏"],
      communication: ["UART串口调试", "ESP8266 WiFi", "WiFi云平台通信", "LoRa通信", "NB-IoT通信模块"],
      storage: ["W25Q64 SPI Flash", "W25Q128 SPI Flash", "MicroSD卡模块", "TF卡座模块", "日志缓存系统", "大容量SPI Flash", "FRAM", "MB85RC I2C FRAM", "SD卡数据记录系统", "云端数据同步"],
      actuator: ["普通LED", "双色LED", "蜂鸣器", "有源蜂鸣器", "RGB状态灯"]
    }
  },
  bluetoothRemote: {
    label: "蓝牙遥控项目",
    weights: {
      controller: ["STM32F103C8T6", "ESP32-WROOM", "ESP32-C3", "ESP32-S3"],
      sensor: ["MPU6050", "红外避障模块", "倾斜开关", "电位器"],
      display: ["LED + 蜂鸣器", "OLED + 按键", "旋转编码器 + OLED", "按键矩阵", "电容触摸按键"],
      communication: ["HC-05蓝牙", "DX-BT24蓝牙", "蓝牙BLE串口模块", "ESP32 WiFi + BLE"],
      storage: ["EEPROM", "24C32 EEPROM", "参数保存在Flash", "AT24C02 EEPROM"],
      actuator: ["继电器", "MOS管开关", "SG90舵机", "TB6612电机驱动", "RGB状态灯", "继电器组", "多路舵机控制"]
    }
  },
  iotMonitor: {
    label: "物联网监测项目",
    weights: {
      controller: ["ESP8266", "ESP32-WROOM", "ESP32-C3", "ESP32-S3", "Raspberry Pi Pico W"],
      sensor: ["DHT11", "AHT20", "MQ气体传感器", "BME280", "SHT31", "VL53L0X激光测距", "CCS811空气质量传感器", "INA219电流传感器"],
      display: ["0.96寸 OLED", "OLED + 按键", "TFT彩屏", "电子墨水屏", "2.4寸 ILI9341 TFT"],
      communication: ["ESP8266 WiFi", "ESP32 WiFi + BLE", "WiFi云平台通信", "ESP-NOW无线通信", "LoRa通信", "4G通信模块", "以太网通信模块", "NB-IoT通信模块"],
      storage: ["W25Q64 SPI Flash", "W25Q128 SPI Flash", "MicroSD卡模块", "SD卡数据记录系统", "云端数据同步"],
      actuator: ["普通LED", "蜂鸣器", "有源蜂鸣器", "RGB状态灯", "继电器"]
    }
  }
};

const hardwareMeta = {
  "STM32F103C8T6": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "medium", "3.3V 逻辑电平，接 5V 模块时要确认是否耐受或加电平转换。"),
  "Arduino UNO": meta("5V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "easy", "5V 逻辑电平，适合入门，但接 3.3V 模块时要注意不要把 5V 信号直接送入模块。"),
  "STC89C52": meta("5V", "GPIO / UART", "low", "medium", "资源较少，很多现代 I2C/SPI 模块需要额外软件模拟或适配。"),
  "ESP8266": meta("3.3V", "GPIO / ADC / SPI / UART / WiFi", "medium", "medium", "3.3V 逻辑，WiFi 发射瞬间电流较高，供电要稳定。"),
  "STM32F401CCU6": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "medium", "3.3V 逻辑，接口资源较丰富。"),
  "STM32F411CEU6": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "medium", "3.3V 逻辑，适合进阶项目。"),
  "ESP32-WROOM": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / WiFi / BLE", "medium", "medium", "3.3V 逻辑，WiFi/BLE 工作时要注意电源峰值电流。"),
  "RP2040": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "medium", "3.3V 逻辑，PIO 很灵活，但生态与 STM32 不同。"),
  "STM32F407VET6": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / CAN", "medium", "hard", "资源丰富但封装和外设配置更复杂。"),
  "STM32H743": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / CAN", "medium", "hard", "性能强但电源、时钟和缓存配置复杂，不太适合纯新手。"),
  "ESP32-S3": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / WiFi / BLE", "medium", "hard", "3.3V 逻辑，适合联网和人机交互项目，供电要留余量。"),
  "Raspberry Pi Pico W": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / WiFi", "medium", "medium", "3.3V 逻辑，WiFi 使用时建议稳定供电。"),

  "光敏电阻": meta("3.3V-5V", "ADC", "low", "easy", "通常需要分压电阻，模拟量输入要匹配 ADC 量程。"),
  "DHT11": meta("3.3V-5V", "GPIO", "low", "easy", "单总线时序敏感，数据线通常需要上拉。"),
  "红外避障模块": meta("3.3V-5V", "GPIO", "low", "easy", "部分模块输出高电平可能接近供电电压，接 3.3V 主控要确认电平。"),
  "NTC温度传感器": meta("3.3V-5V", "ADC", "low", "easy", "需要分压电路和温度换算表。"),
  "AHT20": meta("3.3V", "I2C", "low", "easy", "I2C 地址固定，注意上拉电阻电压。"),
  "MPU6050": meta("3.3V-5V", "I2C", "low", "medium", "常见模块多带稳压，但 I2C 电平仍需确认。"),
  "超声波测距模块": meta("5V", "GPIO", "medium", "easy", "Echo 输出通常为 5V，接 3.3V 主控建议分压或电平转换。"),
  "MQ气体传感器": meta("5V", "ADC / GPIO", "high", "medium", "加热丝功耗较高，需要预热，建议独立供电并共地。"),
  "BME280": meta("3.3V", "I2C / SPI", "low", "medium", "注意模块版本，有些裸芯片不耐 5V。"),
  "VL53L0X激光测距": meta("3.3V", "I2C", "low", "medium", "I2C 地址可能需要配置，多模块并联要注意地址冲突。"),
  "SHT31": meta("3.3V", "I2C", "low", "medium", "I2C 上拉建议接 3.3V。"),
  "ICM20948姿态传感器": meta("3.3V", "I2C / SPI", "low", "hard", "姿态融合算法较复杂，建议先跑通基础数据读取。"),

  "LED + 蜂鸣器": meta("3.3V-5V", "GPIO / PWM", "low", "easy", "蜂鸣器可能需要三极管驱动，避免 IO 口直接带大电流。"),
  "0.96寸 OLED": meta("3.3V-5V", "I2C / SPI", "low", "easy", "常见 I2C OLED 地址为 0x3C，注意与其他 I2C 模块共线。"),
  "四位数码管": meta("5V", "GPIO", "medium", "medium", "建议使用驱动芯片或限流电阻，直接扫描会占用较多 GPIO。"),
  "1602 LCD": meta("5V", "GPIO / I2C", "medium", "easy", "5V LCD 接 3.3V 主控时要注意电平兼容。"),
  "OLED + 按键": meta("3.3V-5V", "I2C / GPIO", "low", "easy", "I2C 显示和按键输入适合入门交互。"),
  "MAX7219点阵屏": meta("5V", "SPI", "medium", "medium", "通常 5V 供电，DIN/CLK/CS 接 3.3V 主控时需确认识别阈值。"),
  "WS2812 RGB灯带": meta("5V", "GPIO", "high", "medium", "灯带电流很大，必须外部 5V 供电并共地，数据信号可能需要电平转换。"),
  "旋转编码器 + OLED": meta("3.3V-5V", "I2C / GPIO", "low", "medium", "编码器需要消抖，OLED 注意 I2C 地址。"),
  "TFT彩屏": meta("3.3V", "SPI", "medium", "medium", "刷新占用 SPI 带宽，注意引脚和片选。"),
  "电子墨水屏": meta("3.3V", "SPI", "medium", "hard", "刷新慢且驱动流程复杂，适合低功耗展示。"),
  "触摸屏": meta("3.3V", "SPI / I2C", "medium", "hard", "显示和触摸可能占用多个总线或片选。"),
  "高清IPS彩屏": meta("3.3V", "SPI / RGB", "high", "hard", "分辨率高，刷新和显存压力较大。"),

  "UART串口调试": meta("3.3V-5V", "UART", "low", "easy", "串口电平要与主控一致，USB 转串口模块不能接错 TX/RX。"),
  "USB-TTL": meta("3.3V-5V", "UART", "low", "easy", "确认 USB-TTL 电平档位是 3.3V 还是 5V。"),
  "HC-05蓝牙": meta("3.3V-5V", "UART", "low", "easy", "模块供电常可 5V，但 RX 引脚通常是 3.3V 电平，建议分压。"),
  "DX-BT24蓝牙": meta("3.3V", "UART", "low", "medium", "BLE 串口模块通常为 3.3V 逻辑。"),
  "ESP8266 WiFi": meta("3.3V", "UART", "medium", "medium", "峰值电流较高，建议 3.3V 稳压电源留足余量。"),
  "ESP32 WiFi + BLE": meta("3.3V", "UART / WiFi / BLE", "medium", "medium", "无线工作时电源波动会导致复位。"),
  "RS485通信": meta("5V", "UART", "medium", "medium", "常见模块为 5V 收发器，3.3V 主控需确认 DI/RO 电平。"),
  "CAN通信模块": meta("3.3V-5V", "CAN / SPI", "medium", "medium", "需要终端电阻，模块接口可能是 SPI 或 CAN TX/RX。"),
  "WiFi云平台通信": meta("3.3V", "WiFi / UART", "medium", "hard", "涉及联网协议、账号配置和稳定供电。"),
  "LoRa通信": meta("3.3V", "SPI", "medium", "hard", "射频模块需注意天线、法规和 SPI 引脚。"),
  "4G通信模块": meta("3.8V-5V", "UART / USB", "high", "hard", "瞬时电流很高，通常需要独立电源和大电容。"),
  "以太网通信模块": meta("3.3V", "SPI", "medium", "medium", "常见 W5500 走 SPI，占用片选和较多缓冲。"),

  "片内Flash": meta("3.3V/5V", "Flash", "low", "easy", "无需额外硬件，但擦写次数有限。"),
  "EEPROM": meta("3.3V-5V", "I2C", "low", "easy", "写入速度慢，适合保存少量参数。"),
  "无外部存储": meta("无", "None", "low", "easy", "无需额外存储硬件，功能会更简单。"),
  "参数保存在Flash": meta("3.3V/5V", "Flash", "low", "easy", "注意 Flash 擦写寿命，不适合高频日志。"),
  "W25Q64 SPI Flash": meta("3.3V", "SPI", "low", "medium", "3.3V SPI Flash，不可直接接 5V 信号。"),
  "MicroSD卡模块": meta("3.3V-5V", "SPI", "medium", "medium", "写卡瞬间电流较高，文件系统需要异常断电保护。"),
  "AT24C02 EEPROM": meta("3.3V-5V", "I2C", "low", "easy", "容量较小，适合保存配置。"),
  "日志缓存系统": meta("3.3V-5V", "Flash / RAM", "low", "medium", "需要设计缓存刷新策略，避免频繁写入。"),
  "大容量SPI Flash": meta("3.3V", "SPI", "medium", "medium", "容量大但需要分区和磨损管理。"),
  "FRAM": meta("3.3V", "I2C / SPI", "low", "medium", "速度快、寿命高，但成本较高。"),
  "SD卡数据记录系统": meta("3.3V-5V", "SPI / SDIO", "medium", "hard", "涉及文件系统、掉电保护和写入缓存。"),
  "云端数据同步": meta("3.3V", "WiFi / UART", "medium", "hard", "需要通信协议、断线重连和数据缓存。"),

  "普通LED": meta("3.3V-5V", "GPIO / PWM", "low", "easy", "必须串联限流电阻。"),
  "蜂鸣器": meta("3.3V-5V", "GPIO / PWM", "medium", "easy", "有源蜂鸣器简单，无源蜂鸣器需要 PWM；电流大时加三极管。"),
  "小马达": meta("3V-6V", "GPIO / PWM", "high", "medium", "需要驱动管或驱动模块，不能直接接 IO。"),
  "继电器": meta("5V", "GPIO", "high", "medium", "线圈电流较大，需驱动电路和续流保护。"),
  "SG90舵机": meta("5V", "PWM", "high", "medium", "建议外部 5V 供电并与主控共地。"),
  "震动马达": meta("3V-5V", "GPIO / PWM", "high", "medium", "需要三极管/MOS 管驱动。"),
  "TB6612电机驱动": meta("3.3V-5V", "GPIO / PWM", "high", "medium", "逻辑和电机电源分开，电机电源要按负载选择。"),
  "RGB状态灯": meta("5V", "GPIO", "medium", "medium", "若为可寻址 RGB，3.3V 数据接 5V 灯珠可能需要电平转换。"),
  "步进电机": meta("5V-12V", "GPIO / PWM", "high", "hard", "必须使用驱动器和外部电源，注意电流和散热。"),
  "多路舵机控制": meta("5V-6V", "PWM / I2C", "high", "hard", "多舵机电流很大，必须独立供电，避免主控掉电复位。"),
  "闭环电机控制": meta("6V-24V", "PWM / UART / CAN", "high", "hard", "涉及编码器反馈、电流保护和控制参数整定。"),
  "无刷电机驱动": meta("7.4V-24V", "PWM / UART", "high", "hard", "功率高且有安全风险，新手不建议直接制作。")
};

Object.assign(hardwareMeta, {
  "Arduino Nano": meta("5V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "easy", "体积小、资料多，逻辑电平通常为 5V。"),
  "ATmega328P最小系统": meta("5V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "medium", "需要外部晶振、复位和下载接口，适合从 Arduino 进阶到裸片。"),
  "CH32V003": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "medium", "低成本 RISC-V MCU，生态不如 STM32/Arduino 完整。"),
  "STM8S103F3": meta("3.3V-5V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "medium", "资源有限，适合小型控制项目。"),
  "STM32G030F6P6": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "medium", "新一代入门 STM32，注意封装和下载方式。"),
  "STM32L031K6": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "medium", "低功耗 STM32，适合电池项目。"),
  "GD32F103C8T6": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "medium", "与 STM32F103 类似但库和时钟配置需核对。"),
  "ESP32-C3": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / WiFi / BLE", "medium", "medium", "RISC-V WiFi/BLE MCU，供电要稳定。"),
  "STM32F429IGT6": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / CAN / RGB", "medium", "hard", "适合图形显示项目，但封装和外部存储较复杂。"),
  "STM32F767ZI": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / CAN / Ethernet", "medium", "hard", "性能强，适合高阶联网和显示项目。"),
  "ESP32-PICO-D4": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / WiFi / BLE", "medium", "hard", "高度集成 ESP32，焊接和开发板选型要注意。"),
  "Teensy 4.0": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM", "medium", "hard", "性能很强但 IO 仅 3.3V，价格较高。"),

  "DS18B20": meta("3.3V-5V", "GPIO", "low", "easy", "单总线温度传感器，数据线需要上拉电阻。"),
  "霍尔开关": meta("3.3V-5V", "GPIO", "low", "easy", "用于磁场/转速检测，注意输出类型是模拟还是数字。"),
  "倾斜开关": meta("3.3V-5V", "GPIO", "low", "easy", "机械触点需要消抖，适合姿态触发。"),
  "电位器": meta("3.3V-5V", "ADC", "low", "easy", "输出模拟电压不能超过主控 ADC 量程。"),
  "BMP280": meta("3.3V", "I2C / SPI", "low", "medium", "气压传感器，注意模块是否带 5V 兼容电路。"),
  "APDS-9960手势传感器": meta("3.3V", "I2C", "low", "medium", "手势/接近/颜色传感器，I2C 地址需确认。"),
  "TCS34725颜色传感器": meta("3.3V-5V", "I2C", "low", "medium", "颜色识别受光照影响，建议加固定光源。"),
  "INA219电流传感器": meta("3.3V-5V", "I2C", "low", "medium", "用于电压电流监测，分流电阻量程要匹配负载。"),
  "CCS811空气质量传感器": meta("3.3V", "I2C", "low", "hard", "空气质量算法需要预热和基线校准。"),
  "MAX30102心率血氧": meta("3.3V", "I2C", "low", "hard", "对机械结构和算法要求较高，仅适合作学习演示。"),
  "AS5600磁编码器": meta("3.3V-5V", "I2C / PWM", "low", "medium", "需要径向磁铁，安装同轴度会影响精度。"),
  "MLX90614红外测温": meta("3.3V-5V", "I2C", "low", "medium", "非接触测温，视场角和目标材质会影响结果。"),

  "8x8 LED点阵": meta("5V", "GPIO / SPI", "medium", "medium", "建议使用驱动芯片，注意限流。"),
  "1.3寸 OLED": meta("3.3V-5V", "I2C / SPI", "low", "easy", "常见 SH1106/SSD1306 驱动，注意分辨率差异。"),
  "TM1637数码管": meta("3.3V-5V", "GPIO", "low", "easy", "两线接口，适合显示数字和状态。"),
  "按键矩阵": meta("3.3V-5V", "GPIO", "low", "easy", "需要扫描和消抖，占用多路 GPIO。"),
  "I2C 1602 LCD": meta("5V", "I2C", "medium", "easy", "I2C 背包多为 5V，接 3.3V 主控需确认电平。"),
  "ST7735 TFT屏": meta("3.3V", "SPI", "medium", "medium", "小尺寸彩屏，SPI 刷新速度可接受。"),
  "1.28寸圆形彩屏": meta("3.3V", "SPI", "medium", "medium", "常见 GC9A01 驱动，适合桌面仪表。"),
  "电容触摸按键": meta("3.3V-5V", "GPIO / I2C", "low", "medium", "对布线和外壳材料较敏感。"),
  "2.4寸 ILI9341 TFT": meta("3.3V", "SPI", "medium", "medium", "资料丰富，适合图形界面。"),
  "1.54寸电子墨水屏": meta("3.3V", "SPI", "medium", "hard", "低功耗显示，刷新慢且驱动流程较复杂。"),
  "2.8寸触摸TFT": meta("3.3V", "SPI / I2C", "medium", "hard", "显示和触摸共用/复用总线时要注意片选。"),
  "Nextion串口屏": meta("5V", "UART", "medium", "medium", "屏幕自带 UI 逻辑，串口协议简单但价格较高。"),

  "CH340 USB串口": meta("3.3V-5V", "UART / USB", "low", "easy", "常见 USB 转串口芯片，注意电平档位。"),
  "RS232电平转换": meta("3.3V-5V", "UART", "low", "medium", "需要 MAX3232/MAX232 等转换芯片，不能直接接 RS232 电平。"),
  "NRF24L01无线模块": meta("3.3V", "SPI", "medium", "medium", "对供电和天线敏感，建议加去耦电容。"),
  "红外遥控接收": meta("3.3V-5V", "GPIO", "low", "easy", "适合遥控输入，需要解码协议。"),
  "W5500以太网模块": meta("3.3V", "SPI", "medium", "medium", "SPI 以太网模块，适合稳定局域网通信。"),
  "ESP-NOW无线通信": meta("3.3V", "WiFi", "medium", "medium", "适合 ESP 系列之间低延迟通信。"),
  "蓝牙BLE串口模块": meta("3.3V", "UART / BLE", "low", "medium", "BLE 串口透传，手机端兼容性需测试。"),
  "Zigbee串口模块": meta("3.3V-5V", "UART", "medium", "medium", "适合低功耗组网，需配置网络参数。"),
  "NB-IoT通信模块": meta("3.3V-5V", "UART", "high", "hard", "联网流程和 SIM/平台配置较复杂，需独立供电。"),
  "双频WiFi模块": meta("3.3V", "UART / SPI / WiFi", "medium", "hard", "驱动和协议栈复杂，建议使用成熟开发板。"),
  "PoE以太网模块": meta("5V", "SPI / Ethernet", "high", "hard", "涉及供电和网络隔离，购买成品模块更安全。"),
  "GNSS定位通信组合": meta("3.3V-5V", "UART", "medium", "medium", "定位需要天线和开阔环境，冷启动较慢。"),

  "24C32 EEPROM": meta("3.3V-5V", "I2C", "low", "easy", "容量比 AT24C02 更大，适合保存配置。"),
  "RTC备份寄存器": meta("3.3V/5V", "RTC / RAM", "low", "easy", "依赖主控或 RTC 芯片的备份域，断电保持能力有限。"),
  "小容量SPI Flash": meta("3.3V", "SPI", "low", "medium", "适合保存少量日志或资源文件。"),
  "配置拨码开关": meta("3.3V-5V", "GPIO", "low", "easy", "适合离线配置模式，注意上拉/下拉。"),
  "W25Q128 SPI Flash": meta("3.3V", "SPI", "low", "medium", "容量更大，适合资源文件和日志。"),
  "TF卡座模块": meta("3.3V-5V", "SPI", "medium", "medium", "与 MicroSD 类似，注意供电和文件系统。"),
  "MB85RC I2C FRAM": meta("3.3V-5V", "I2C", "low", "medium", "FRAM 擦写寿命高，适合频繁保存参数。"),
  "LittleFS文件系统": meta("3.3V/5V", "Flash", "low", "medium", "软件文件系统方案，依赖底层 Flash。"),
  "QSPI Flash": meta("3.3V", "SPI", "medium", "hard", "速度快但引脚更多，需主控支持 QSPI。"),
  "eMMC存储模块": meta("3.3V", "SDIO", "medium", "hard", "接口和焊接较复杂，通常不建议初学者直接使用。"),
  "双MicroSD冗余记录": meta("3.3V-5V", "SPI / SDIO", "high", "hard", "需要文件系统和冗余策略，调试复杂。"),
  "外部SRAM缓存模块": meta("3.3V", "SPI / FSMC", "medium", "hard", "需要考虑总线时序和地址映射。"),

  "双色LED": meta("3.3V-5V", "GPIO / PWM", "low", "easy", "需要限流电阻，可显示双状态。"),
  "MOS管开关": meta("3.3V-5V", "GPIO / PWM", "medium", "medium", "适合控制灯带、风扇等负载，注意栅极驱动和续流。"),
  "有源蜂鸣器": meta("3.3V-5V", "GPIO", "low", "easy", "只需高低电平控制，电流较大时加三极管。"),
  "5V风扇模块": meta("5V", "GPIO / PWM", "high", "medium", "建议外部 5V 供电，使用 MOS 管控制。"),
  "PCA9685舵机驱动": meta("3.3V-5V", "I2C / PWM", "high", "medium", "适合多路舵机，舵机电源必须独立。"),
  "DRV8833电机驱动": meta("3.3V-5V", "GPIO / PWM", "high", "medium", "适合小电机，注意电机电源和散热。"),
  "电磁铁模块": meta("5V-12V", "GPIO", "high", "medium", "需要驱动和续流保护，不能直接接 IO。"),
  "继电器组": meta("5V", "GPIO", "high", "medium", "多路继电器电流较大，注意隔离和触点负载。"),
  "大扭矩舵机": meta("5V-7.4V", "PWM", "high", "hard", "电流大，需要独立大电流电源。"),
  "直流减速电机带编码器": meta("6V-12V", "PWM / GPIO", "high", "hard", "需要电机驱动和编码器计数，注意抗干扰。"),
  "智能舵机总线": meta("7.4V-12V", "UART", "high", "hard", "总线协议和供电要求较高，建议使用官方转接板。"),
  "气泵/电磁阀控制": meta("5V-12V", "GPIO / PWM", "high", "hard", "涉及气路和功率驱动，注意安全和续流保护。")
});

Object.assign(hardwareMeta, {
  "ATmega328P": meta("5V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "medium", "裸片或最小系统需要晶振、复位和下载接口。"),
  "STM8S103F3P6": meta("3.3V-5V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "medium", "资源有限，适合小型控制项目。"),
  "STM32G030K8T6": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "medium", "入门级 STM32G0，注意下载接口和封装。"),
  "STM32L031K6T6": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM", "low", "medium", "低功耗 STM32，适合电池项目。"),
  "CH32V307": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / CAN / USB / Ethernet", "medium", "hard", "接口丰富但生态和例程需要额外熟悉。"),
  "STM32G474RET6": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / CAN", "medium", "hard", "高性能混合信号 MCU，适合电机和电源控制。"),
  "STM32L476RG": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / CAN", "low", "hard", "低功耗高资源 MCU，外设配置较复杂。"),
  "Teensy 4.1": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / Ethernet", "medium", "hard", "性能很强但 IO 仅 3.3V，价格较高。"),
  "ESP32-P4": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / RGB", "medium", "hard", "适合显示和边缘应用，生态仍需确认。"),
  "土壤湿度传感器": meta("3.3V-5V", "ADC / GPIO", "low", "easy", "廉价电阻式探头易腐蚀，建议短时测量或使用电容式版本。"),
  "霍尔传感器": meta("3.3V-5V", "GPIO / ADC", "low", "easy", "用于磁场、转速或位置检测，注意输出类型。"),
  "雨滴传感器": meta("3.3V-5V", "ADC / GPIO", "low", "easy", "探板易氧化，适合演示和短期监测。"),
  "火焰传感器": meta("3.3V-5V", "ADC / GPIO", "low", "easy", "只能做教学演示，不能替代安全级火灾报警器。"),
  "BMI160": meta("3.3V", "I2C / SPI", "low", "medium", "六轴 IMU，姿态算法需要滤波。"),
  "PMS5003粉尘传感器": meta("5V", "UART", "medium", "medium", "需要稳定 5V 供电和通风结构。"),
  "SGP30空气质量传感器": meta("3.3V", "I2C", "low", "medium", "需要预热和基线校准。"),
  "独立按键": meta("3.3V-5V", "GPIO", "low", "easy", "需要上拉/下拉和软件消抖。"),
  "矩阵键盘": meta("3.3V-5V", "GPIO", "low", "easy", "需要扫描行列并处理按键消抖。"),
  "双位LED数码管": meta("5V", "GPIO", "medium", "easy", "需要限流和扫描，占用 GPIO。"),
  "12864 LCD": meta("5V", "GPIO / SPI", "medium", "medium", "并口占用引脚较多，SPI 版本更省线。"),
  "RGB状态灯矩阵": meta("5V", "GPIO", "high", "medium", "电流较大，建议外部 5V 供电。"),
  "圆形LCD屏": meta("3.3V", "SPI", "medium", "medium", "常见圆形屏走 SPI，注意驱动芯片型号。"),
  "HMI串口屏": meta("5V", "UART", "medium", "medium", "屏内自带 UI，串口协议简单但需编辑屏幕工程。"),
  "多功能旋钮屏": meta("3.3V-5V", "I2C / SPI / GPIO", "medium", "hard", "集成旋钮、按键和显示，需确认具体模块协议。"),
  "小尺寸GUI彩屏": meta("3.3V", "SPI", "medium", "medium", "适合简单 GUI，注意刷新速度和字体资源。"),
  "NRF24L01": meta("3.3V", "SPI", "medium", "medium", "对供电敏感，建议加 10uF 以上去耦电容。"),
  "软串口通信": meta("3.3V-5V", "GPIO / UART", "low", "medium", "用 GPIO 模拟串口，占用 CPU 且高速不稳定。"),
  "简单单线通信": meta("3.3V-5V", "GPIO", "low", "medium", "时序敏感，适合低速短线通信。"),
  "LoRa SX1278": meta("3.3V", "SPI", "medium", "medium", "注意天线和频段法规。"),
  "Zigbee模块": meta("3.3V-5V", "UART", "medium", "medium", "需要配置网络和节点参数。"),
  "BLE低功耗蓝牙": meta("3.3V", "UART / BLE", "low", "medium", "适合手机端低功耗通信。"),
  "Modbus RTU通信": meta("3.3V-5V", "UART / RS485", "medium", "medium", "需要 RS485 收发器和协议栈。"),
  "NB-IoT通信": meta("3.3V-5V", "UART", "high", "hard", "联网流程和平台配置较复杂，建议独立供电。"),
  "MQTT物联网通信": meta("3.3V", "WiFi / UART", "medium", "medium", "需要联网模块和 MQTT 服务器配置。"),
  "Matter智能家居通信": meta("3.3V", "WiFi / BLE", "medium", "hard", "协议栈复杂，建议使用成熟模组。"),
  "双模WiFi + BLE网关": meta("3.3V", "WiFi / BLE / UART", "medium", "hard", "适合网关项目，供电和协议栈要稳定。"),
  "AT24C02": meta("3.3V-5V", "I2C", "low", "easy", "容量较小，适合保存配置参数。"),
  "简单环形缓存": meta("3.3V/5V", "RAM", "low", "easy", "软件缓存方案，掉电后数据丢失。"),
  "串口日志输出": meta("3.3V-5V", "UART", "low", "easy", "无需外部存储，适合调试阶段。"),
  "RAM临时缓存": meta("3.3V/5V", "RAM", "low", "easy", "速度快但掉电丢失，适合临时数据。"),
  "I2C EEPROM": meta("3.3V-5V", "I2C", "low", "easy", "适合保存少量参数。"),
  "FATFS文件系统": meta("3.3V-5V", "SPI / SDIO", "medium", "medium", "通常配合 SD 卡使用，注意掉电保护。"),
  "CSV数据日志": meta("3.3V-5V", "SPI / UART", "low", "medium", "软件日志格式，需搭配存储或串口输出。"),
  "双存储冗余": meta("3.3V-5V", "SPI / I2C", "medium", "hard", "需要设计同步和恢复策略。"),
  "数据压缩存储": meta("3.3V/5V", "Flash / RAM", "low", "hard", "软件复杂度较高，适合进阶优化。"),
  "断电保护日志系统": meta("3.3V-5V", "Flash / SPI", "medium", "hard", "需要缓存、校验和掉电检测。"),
  "震动提醒马达": meta("3V-5V", "GPIO / PWM", "high", "medium", "需要三极管或 MOS 管驱动。"),
  "激光指示模块": meta("3.3V-5V", "GPIO", "medium", "easy", "注意眼睛安全，不要直视激光。"),
  "小风扇": meta("5V", "GPIO / PWM", "high", "medium", "建议外部 5V 供电并使用 MOS 管驱动。"),
  "ULN2003步进电机驱动": meta("5V", "GPIO", "high", "medium", "常用于 28BYJ-48 步进电机，注意供电。"),
  "5V继电器模块": meta("5V", "GPIO", "high", "medium", "线圈电流较大，注意隔离和续流。"),
  "有源蜂鸣器阵列": meta("3.3V-5V", "GPIO", "medium", "medium", "多路蜂鸣器需要驱动电路。"),
  "直流电机调速": meta("3V-12V", "PWM", "high", "medium", "需要电机驱动或 MOS 管，注意反电动势。"),
  "机械臂控制": meta("5V-7.4V", "PWM / I2C", "high", "hard", "多舵机电流很大，需要独立供电和结构调试。"),
  "云台控制系统": meta("5V-12V", "PWM / UART", "high", "hard", "涉及多轴控制和供电稳定性。"),
  "线性执行器": meta("6V-12V", "GPIO / PWM", "high", "hard", "需要驱动和限位保护，注意机械安全。"),
  "多轴运动控制": meta("12V-24V", "PWM / UART / CAN", "high", "hard", "高功率和控制复杂度较高，新手需谨慎。")
});

const structuredHardwarePools = {
  controller: {
    blue: ["STM32F103C8T6", "Arduino UNO", "Arduino Nano", "STC89C52", "ESP8266", "CH32V003", "ATmega328P", "STM8S103F3P6"],
    pink: ["STM32F401CCU6", "STM32F411CEU6", "ESP32-WROOM", "RP2040", "STM32G030K8T6", "STM32L031K6T6", "GD32F103C8T6", "CH32V307"],
    gold: ["STM32F407VET6", "STM32H743", "ESP32-S3", "Raspberry Pi Pico W", "STM32G474RET6", "STM32L476RG", "Teensy 4.1", "ESP32-P4"]
  },
  sensor: {
    blue: ["光敏电阻", "DHT11", "红外避障模块", "NTC温度传感器", "土壤湿度传感器", "倾斜开关", "霍尔传感器", "雨滴传感器"],
    pink: ["AHT20", "MPU6050", "超声波测距模块", "MQ气体传感器", "DS18B20", "BMP280", "TCS34725颜色传感器", "火焰传感器"],
    gold: ["BME280", "VL53L0X激光测距", "SHT31", "ICM20948姿态传感器", "BMI160", "PMS5003粉尘传感器", "SGP30空气质量传感器", "MLX90614红外测温"]
  },
  display: {
    blue: ["LED + 蜂鸣器", "0.96寸 OLED", "四位数码管", "1602 LCD", "独立按键", "矩阵键盘", "电位器", "双位LED数码管"],
    pink: ["OLED + 按键", "MAX7219点阵屏", "WS2812 RGB灯带", "旋转编码器 + OLED", "1.3寸 OLED", "TM1637数码管", "12864 LCD", "RGB状态灯矩阵"],
    gold: ["TFT彩屏", "电子墨水屏", "触摸屏", "高清IPS彩屏", "圆形LCD屏", "HMI串口屏", "多功能旋钮屏", "小尺寸GUI彩屏"]
  },
  communication: {
    blue: ["UART串口调试", "USB-TTL", "HC-05蓝牙", "DX-BT24蓝牙", "红外遥控接收", "NRF24L01", "软串口通信", "简单单线通信"],
    pink: ["ESP8266 WiFi", "ESP32 WiFi + BLE", "RS485通信", "CAN通信模块", "LoRa SX1278", "Zigbee模块", "BLE低功耗蓝牙", "Modbus RTU通信"],
    gold: ["WiFi云平台通信", "LoRa通信", "4G通信模块", "以太网通信模块", "NB-IoT通信", "MQTT物联网通信", "Matter智能家居通信", "双模WiFi + BLE网关"]
  },
  storage: {
    blue: ["片内Flash", "EEPROM", "无外部存储", "参数保存在Flash", "AT24C02", "简单环形缓存", "串口日志输出", "RAM临时缓存"],
    pink: ["W25Q64 SPI Flash", "MicroSD卡模块", "AT24C02 EEPROM", "日志缓存系统", "W25Q128 SPI Flash", "I2C EEPROM", "FATFS文件系统", "CSV数据日志"],
    gold: ["大容量SPI Flash", "FRAM", "SD卡数据记录系统", "云端数据同步", "双存储冗余", "LittleFS文件系统", "数据压缩存储", "断电保护日志系统"]
  },
  actuator: {
    blue: ["普通LED", "蜂鸣器", "小马达", "继电器", "震动提醒马达", "激光指示模块", "小风扇", "电磁铁模块"],
    pink: ["SG90舵机", "震动马达", "TB6612电机驱动", "RGB状态灯", "ULN2003步进电机驱动", "5V继电器模块", "有源蜂鸣器阵列", "直流电机调速"],
    gold: ["步进电机", "多路舵机控制", "闭环电机控制", "无刷电机驱动", "机械臂控制", "云台控制系统", "线性执行器", "多轴运动控制"]
  }
};

function toHardwareOption(name, rarity, category) {
  const metaInfo = hardwareMeta[name] || meta("未知", "Unknown", "medium", "medium", "暂未录入详细参数，实际制作前请查阅资料手册。");
  return {
    name,
    rarity,
    category,
    voltage: metaInfo.voltage,
    interface: interfaceToArray(metaInfo.interface),
    powerLevel: metaInfo.powerLevel,
    difficulty: metaInfo.difficulty,
    notes: metaInfo.notes,
    alternatives: getDefaultAlternatives(category)
  };
}

function activateStructuredHardwarePools() {
  modulePools.forEach((module) => {
    const source = structuredHardwarePools[module.key];
    if (!source) return;
    module.pool = {
      blue: source.blue.map((name) => toHardwareOption(name, "blue", module.label)),
      pink: source.pink.map((name) => toHardwareOption(name, "pink", module.label)),
      gold: source.gold.map((name) => toHardwareOption(name, "gold", module.label))
    };
  });
}

function interfaceToArray(value) {
  if (Array.isArray(value)) return value;
  return String(value).split("/").map((item) => item.trim()).filter(Boolean);
}

function getHardwareName(hardware) {
  return typeof hardware === "string" ? hardware : hardware.name;
}

function normalizeHardwareMeta(hardware, name) {
  const base = typeof hardware === "object" && hardware !== null
    ? hardware
    : hardwareMeta[name] || meta("未知", "Unknown", "medium", "medium", "暂未录入详细参数，实际制作前请查阅资料手册。");

  return {
    voltage: base.voltage || "未知",
    interface: interfaceToArray(base.interface || "Unknown"),
    powerLevel: base.powerLevel || "medium",
    difficulty: base.difficulty || "medium",
    notes: base.notes || "实际制作前请核对器件资料手册。",
    alternatives: Array.isArray(base.alternatives) ? base.alternatives : getDefaultAlternatives(base.category)
  };
}

function formatInterface(value) {
  return interfaceToArray(value).join(" / ");
}

function hasInterface(value, interfaceName) {
  return interfaceToArray(value).includes(interfaceName);
}

function getDefaultAlternatives(category) {
  const alternatives = {
    主控核心: ["STM32F103C8T6", "ESP32-WROOM", "RP2040"],
    感知模块: ["AHT20", "MPU6050", "BME280"],
    显示交互: ["0.96寸 OLED", "1602 LCD", "TFT彩屏"],
    通信模块: ["UART串口调试", "HC-05蓝牙", "ESP8266 WiFi"],
    存储模块: ["片内Flash", "W25Q64 SPI Flash", "MicroSD卡模块"],
    "执行器/输出模块": ["普通LED", "蜂鸣器", "SG90舵机"]
  };
  return alternatives[category] || ["同接口兼容模块"];
}

Object.assign(hardwareMeta, {
  "ATmega328P": hardwareMeta["ATmega328P最小系统"],
  "STM8S103F3P6": hardwareMeta["STM8S103F3"],
  "STM32G030K8T6": hardwareMeta["STM32G030F6P6"],
  "STM32L031K6T6": hardwareMeta["STM32L031K6"],
  "CH32V307": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / USB / Ethernet", "medium", "hard", "接口丰富，生态资料需提前确认。"),
  "STM32G474RET6": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / CAN", "medium", "hard", "适合电机控制和模拟采样，外设配置较复杂。"),
  "STM32L476RG": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / CAN", "low", "hard", "低功耗高性能，适合电池和数据记录项目。"),
  "Teensy 4.1": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / Ethernet", "medium", "hard", "性能强但价格较高，IO 仅 3.3V。"),
  "ESP32-P4": meta("3.3V", "GPIO / ADC / I2C / SPI / UART / PWM / USB", "medium", "hard", "适合高性能显示和边缘处理，开发资料需确认。"),
  "土壤湿度传感器": meta("3.3V-5V", "ADC", "low", "easy", "廉价探针易腐蚀，建议使用电容式版本。"),
  "霍尔传感器": hardwareMeta["霍尔开关"],
  "雨滴传感器": meta("3.3V-5V", "ADC / GPIO", "low", "easy", "探板易氧化，户外使用需防水防腐。"),
  "火焰传感器": meta("3.3V-5V", "ADC / GPIO", "low", "easy", "只能做简单火焰/红外变化检测，不能替代安全设备。"),
  "BMI160": meta("3.3V", "I2C / SPI", "low", "medium", "六轴 IMU，姿态算法需要滤波。"),
  "PMS5003粉尘传感器": meta("5V", "UART", "medium", "medium", "体积较大，风道和供电要稳定。"),
  "SGP30空气质量传感器": meta("3.3V", "I2C", "low", "hard", "需要预热和基线校准，适合空气质量趋势监测。"),
  "独立按键": meta("3.3V-5V", "GPIO", "low", "easy", "需要上拉/下拉和消抖。"),
  "矩阵键盘": meta("3.3V-5V", "GPIO", "low", "easy", "需要行列扫描，占用多路 GPIO。"),
  "双位LED数码管": meta("5V", "GPIO", "medium", "medium", "需要限流和动态扫描。"),
  "12864 LCD": meta("5V", "GPIO / SPI", "medium", "medium", "接口版本较多，接线前确认并口/串口模式。"),
  "RGB状态灯矩阵": meta("5V", "GPIO", "high", "medium", "多颗 RGB 灯电流较大，建议外部供电。"),
  "圆形LCD屏": hardwareMeta["1.28寸圆形彩屏"],
  "HMI串口屏": hardwareMeta["Nextion串口屏"],
  "多功能旋钮屏": meta("3.3V-5V", "I2C / SPI / GPIO", "medium", "hard", "通常集成编码器、按键和显示，需确认模块协议。"),
  "小尺寸GUI彩屏": hardwareMeta["2.4寸 ILI9341 TFT"],
  "NRF24L01": hardwareMeta["NRF24L01无线模块"],
  "软串口通信": meta("3.3V-5V", "UART", "low", "medium", "占用 CPU 时序，波特率不宜过高。"),
  "简单单线通信": meta("3.3V-5V", "GPIO", "low", "medium", "需要自定义时序和校验，抗干扰能力有限。"),
  "LoRa SX1278": hardwareMeta["LoRa通信"],
  "Zigbee模块": hardwareMeta["Zigbee串口模块"],
  "BLE低功耗蓝牙": hardwareMeta["蓝牙BLE串口模块"],
  "Modbus RTU通信": meta("3.3V-5V", "UART", "medium", "medium", "通常基于 RS485，需要地址、波特率和校验配置。"),
  "NB-IoT通信": hardwareMeta["NB-IoT通信模块"],
  "MQTT物联网通信": meta("3.3V", "WiFi / UART", "medium", "hard", "需要联网模块和 MQTT 平台配置。"),
  "Matter智能家居通信": meta("3.3V", "WiFi / BLE", "medium", "hard", "协议栈复杂，建议使用成熟 SDK。"),
  "双模WiFi + BLE网关": meta("3.3V", "WiFi / BLE / UART", "medium", "hard", "适合网关类项目，任务调度和供电要稳定。"),
  "AT24C02": hardwareMeta["AT24C02 EEPROM"],
  "简单环形缓存": meta("3.3V/5V", "RAM / Flash", "low", "easy", "软件缓存方案，需处理覆盖策略。"),
  "串口日志输出": meta("3.3V-5V", "UART", "low", "easy", "无需额外存储，但需要上位机接收日志。"),
  "RAM临时缓存": meta("3.3V/5V", "RAM", "low", "easy", "掉电丢失，仅适合临时数据。"),
  "I2C EEPROM": hardwareMeta["AT24C02 EEPROM"],
  "FATFS文件系统": meta("3.3V-5V", "SPI / SDIO", "medium", "hard", "常用于 SD 卡，需要处理掉电保护。"),
  "CSV数据日志": meta("3.3V-5V", "SPI / UART", "low", "medium", "软件日志格式，适合后续导入表格分析。"),
  "双存储冗余": meta("3.3V-5V", "SPI / I2C", "medium", "hard", "需要设计同步和故障切换策略。"),
  "数据压缩存储": meta("3.3V/5V", "Flash / RAM", "low", "hard", "软件压缩会增加 CPU 和内存压力。"),
  "断电保护日志系统": meta("3.3V-5V", "Flash / SPI", "medium", "hard", "需要缓存、校验和掉电恢复机制。"),
  "震动提醒马达": hardwareMeta["震动马达"],
  "激光指示模块": meta("3.3V-5V", "GPIO", "medium", "medium", "注意激光安全，避免直视。"),
  "小风扇": hardwareMeta["5V风扇模块"],
  "ULN2003步进电机驱动": meta("5V-12V", "GPIO", "high", "medium", "常用于 28BYJ-48 步进电机，需外部供电。"),
  "5V继电器模块": hardwareMeta["继电器"],
  "有源蜂鸣器阵列": meta("3.3V-5V", "GPIO", "medium", "medium", "多蜂鸣器会增加电流，建议驱动管控制。"),
  "直流电机调速": hardwareMeta["DRV8833电机驱动"],
  "机械臂控制": meta("5V-7.4V", "PWM / I2C", "high", "hard", "多舵机电流很大，结构和电源都要预留余量。"),
  "云台控制系统": meta("5V-12V", "PWM / UART", "high", "hard", "涉及多轴控制和稳定性调试。"),
  "线性执行器": meta("6V-12V", "GPIO / PWM", "high", "hard", "需要驱动、限位和过流保护。"),
  "多轴运动控制": meta("12V-24V", "PWM / UART / CAN", "high", "hard", "多电机系统复杂，建议分轴调试。")
});

activateStructuredHardwarePools();

const tracksContainer = document.querySelector("#tracksContainer");
const modeGrid = document.querySelector("#modeGrid");
const strategySwitch = document.querySelector("#strategySwitch");
const startBtn = document.querySelector("#startBtn");
const soundToggleBtn = document.querySelector("#soundToggleBtn");
const statusText = document.querySelector("#statusText");
const resultSection = document.querySelector("#resultSection");
const projectResult = document.querySelector("#projectResult");
const favoriteBtn = document.querySelector("#favoriteBtn");
const copyMarkdownBtn = document.querySelector("#copyMarkdownBtn");
const copyBomBtn = document.querySelector("#copyBomBtn");
const copyRoadmapBtn = document.querySelector("#copyRoadmapBtn");
const copyPromptBtn = document.querySelector("#copyPromptBtn");
const generateReadmeBtn = document.querySelector("#generateReadmeBtn");
const copyReadmeBtn = document.querySelector("#copyReadmeBtn");
const exportJsonBtn = document.querySelector("#exportJsonBtn");
const importJsonBtn = document.querySelector("#importJsonBtn");
const importJsonInput = document.querySelector("#importJsonInput");
const historyList = document.querySelector("#historyList");
const promptBox = document.querySelector("#promptBox");
const promptBoxLabel = document.querySelector("#promptBox span");
const promptText = document.querySelector("#promptText");
const readmePreview = document.querySelector("#readmePreview");
const readmeText = document.querySelector("#readmeText");
const toast = document.querySelector("#toast");
const poolToggleBtn = document.querySelector("#poolToggleBtn");
const poolOverview = document.querySelector("#poolOverview");
const poolSearchInput = document.querySelector("#poolSearchInput");
const poolRarityFilters = document.querySelector("#poolRarityFilters");
const poolStats = document.querySelector("#poolStats");
const poolContent = document.querySelector("#poolContent");
const moduleTypeSelect = document.querySelector("#moduleTypeSelect");
const addModuleBtn = document.querySelector("#addModuleBtn");
const resetModulesBtn = document.querySelector("#resetModulesBtn");
const moduleCountText = document.querySelector("#moduleCountText");

let trackStates = [];
let generatedProject = null;
let animationFrameId = null;
let toastTimer = null;
let soundEnabled = true;
let audioContext = null;
let tickTimer = null;
let tickStartTime = 0;
let selectedModeKey = "random";
let selectedStrategy = "fun";
let projectHistory = [];
let poolOverviewVisible = false;
let poolRarityFilter = "all";
const collapsedPoolCategories = new Set(modulePools.map((module) => module.key));
const maxModuleSlots = 10;
const expandableCategories = ["sensor", "display", "communication", "storage", "actuator"];
const defaultSlotDefinitions = [
  { id: "controller_1", category: "controller", removable: false },
  { id: "sensor_1", category: "sensor", removable: false },
  { id: "display_1", category: "display", removable: false },
  { id: "communication_1", category: "communication", removable: false },
  { id: "storage_1", category: "storage", removable: false },
  { id: "actuator_1", category: "actuator", removable: false }
];
const projectState = {
  slots: createDefaultSlots(),
  selectedParts: {
    controller: null,
    sensor: null,
    display: null,
    communication: null,
    storage: null,
    actuator: null
  },
  rerollCounts: {
    controller: 0,
    sensor: 0,
    display: 0,
    communication: 0,
    storage: 0,
    actuator: 0
  },
  maxRerolls: 3,
  isRolling: false,
  hasGeneratedProject: false
};

initEmptyTracks();
updateRerollControls();
loadHistory();
renderHistory();

startBtn.addEventListener("click", startDraw);
soundToggleBtn.addEventListener("click", toggleSound);
modeGrid.addEventListener("click", handleModeClick);
strategySwitch.addEventListener("click", handleStrategyClick);
favoriteBtn.addEventListener("click", favoriteCurrentProject);
copyMarkdownBtn.addEventListener("click", () => {
  if (!generatedProject) return;
  copyText(buildMarkdown(generatedProject), "Markdown 项目表已复制。");
});
copyBomBtn.addEventListener("click", () => {
  if (!generatedProject) return;
  copyText(buildBomMarkdown(generatedProject), "BOM Markdown 表格已复制。");
});
copyRoadmapBtn.addEventListener("click", () => {
  if (!generatedProject) return;
  copyText(buildRoadmapMarkdown(generatedProject), "开发路线图 Markdown 已复制。");
});
copyPromptBtn.addEventListener("click", () => {
  if (!generatedProject) return;
  const prompt = buildCodexPrompt(generatedProject);
  promptBoxLabel.textContent = "Codex 开发提示词";
  promptText.value = prompt;
  promptBox.classList.remove("hidden");
  copyText(prompt, "Codex 开发提示词已复制。");
});
generateReadmeBtn.addEventListener("click", () => {
  if (!generatedProject) return;
  readmeText.value = buildFullReadme(generatedProject);
  readmePreview.classList.remove("hidden");
  showToast("完整 README 草稿已生成。");
});
copyReadmeBtn.addEventListener("click", () => {
  const text = readmeText.value || (generatedProject ? buildFullReadme(generatedProject) : "");
  if (!text) return;
  copyText(text, "完整 README 已复制。");
});
exportJsonBtn.addEventListener("click", exportCurrentProjectJson);
importJsonBtn.addEventListener("click", () => importJsonInput.click());
importJsonInput.addEventListener("change", importProjectJson);
projectResult.addEventListener("click", handleCollapsibleClick);
historyList.addEventListener("click", handleHistoryClick);
tracksContainer.addEventListener("click", handleTrackRerollClick);
poolToggleBtn.addEventListener("click", togglePoolOverview);
poolSearchInput.addEventListener("input", renderPoolOverview);
poolRarityFilters.addEventListener("click", handlePoolRarityFilterClick);
poolContent.addEventListener("click", handlePoolCategoryToggle);
if (addModuleBtn) addModuleBtn.addEventListener("click", addCustomModuleSlot);
resetModulesBtn.addEventListener("click", resetModuleConfiguration);

function initEmptyTracks() {
  tracksContainer.innerHTML = projectState.slots.map((slot) => `
    <div class="module-track" data-module-key="${slot.id}">
      <div class="module-name">
        <strong>${slot.label}</strong>
        <span>等待抽奖</span>
      </div>
      <div class="track-window">
        <div class="track-pointer" aria-hidden="true"></div>
        <div class="track-strip"></div>
      </div>
    </div>
  `).join("");
  updateModuleConfigUi();
}

function createDefaultSlots() {
  return defaultSlotDefinitions.map((definition) => createSlot(definition.category, definition.removable, definition.id));
}

function createSlot(category, removable = true, forcedId = null) {
  const index = forcedId ? Number(forcedId.split("_").pop()) || 1 : getNextSlotIndex(category);
  const id = forcedId || `${category}_${index}`;
  return {
    id,
    category,
    label: getSlotLabel(category, index),
    removable,
    selectedPart: null,
    rerollCount: 0
  };
}

function getSlotLabel(category, index) {
  const base = getBaseModule(category).label;
  return index <= 1 ? base : `${base} ${index}`;
}

function getNextSlotIndex(category) {
  const used = projectState.slots
    .filter((slot) => slot.category === category)
    .map((slot) => Number(slot.id.split("_").pop()) || 1);
  for (let index = 1; index <= 3; index += 1) {
    if (!used.includes(index)) return index;
  }
  return used.length + 1;
}

function getBaseModule(category) {
  return modulePools.find((module) => module.key === category);
}

function createModuleFromSlot(slot, index = 0) {
  const base = getBaseModule(slot.category);
  return {
    ...base,
    key: slot.id,
    slotId: slot.id,
    categoryKey: slot.category,
    label: slot.label,
    removable: slot.removable,
    stopMs: Math.min(3200 + index * 600, 9000)
  };
}

function getSlotById(slotId) {
  return projectState.slots.find((slot) => slot.id === slotId);
}

function updateModuleConfigUi() {
  moduleCountText.textContent = `当前模块数：${projectState.slots.length} / ${maxModuleSlots}`;
  const disabled = projectState.isRolling;
  if (addModuleBtn) addModuleBtn.disabled = disabled || projectState.slots.length >= maxModuleSlots;
  resetModulesBtn.disabled = disabled;
  if (moduleTypeSelect) moduleTypeSelect.disabled = disabled;
}

function addCustomModuleSlot() {
  if (projectState.isRolling) return;
  addSlot(moduleTypeSelect ? moduleTypeSelect.value : "sensor");
}

function addSlot(category) {
  if (!canAddSlot(category, true)) return;
  const newSlot = createSlot(category, true);
  const insertIndex = findLastSlotIndex(category) + 1;
  projectState.slots.splice(insertIndex, 0, newSlot);
  renumberSlots(category);
  clearGeneratedProjectAfterSlotChange();
  initEmptyTracks();
  updateRerollControls();
  showToast("已添加同类模块，请重新抽奖。");
}

function canAddSlot(category, showReason = false) {
  if (projectState.isRolling) {
    if (showReason) showToast("抽奖过程中不能添加模块。");
    return false;
  }
  if (!expandableCategories.includes(category)) {
    if (showReason) showToast("主控核心不能额外添加。");
    return false;
  }
  if (projectState.slots.length >= maxModuleSlots) {
    if (showReason) showToast("模块轨道最多 10 条。");
    return false;
  }
  if (projectState.slots.filter((slot) => slot.category === category).length >= 3) {
    if (showReason) showToast("同一类模块最多 3 个。");
    return false;
  }
  return true;
}

function findLastSlotIndex(category) {
  let lastIndex = -1;
  projectState.slots.forEach((slot, index) => {
    if (slot.category === category) lastIndex = index;
  });
  return lastIndex;
}

function renumberSlots(category) {
  projectState.slots
    .filter((slot) => slot.category === category)
    .forEach((slot, index) => {
      const nextIndex = index + 1;
      const oldId = slot.id;
      slot.id = `${category}_${nextIndex}`;
      slot.label = getSlotLabel(category, nextIndex);
      slot.removable = nextIndex > 1;
      if (oldId !== slot.id) {
        projectState.selectedParts[slot.id] = slot.selectedPart || projectState.selectedParts[oldId] || null;
        projectState.rerollCounts[slot.id] = slot.rerollCount || projectState.rerollCounts[oldId] || 0;
        delete projectState.selectedParts[oldId];
        delete projectState.rerollCounts[oldId];
      }
    });
}

function resetModuleConfiguration() {
  if (projectState.isRolling) return;
  projectState.slots = createDefaultSlots();
  clearGeneratedProjectAfterSlotChange();
  initEmptyTracks();
  updateRerollControls();
  showToast("已恢复默认 6 个模块。");
}

function deleteCustomSlot(slotId) {
  if (projectState.isRolling) return;
  const slot = getSlotById(slotId);
  if (!slot || !slot.removable) return;
  const category = slot.category;
  projectState.slots = projectState.slots.filter((item) => item.id !== slotId);
  delete projectState.selectedParts[slotId];
  delete projectState.rerollCounts[slotId];
  renumberSlots(category);
  clearGeneratedProjectAfterSlotChange();
  initEmptyTracks();
  updateRerollControls();
  showToast("已删除模块槽位，请重新抽奖。");
}

function clearGeneratedProjectAfterSlotChange() {
  generatedProject = null;
  projectState.hasGeneratedProject = false;
  promptBox.classList.add("hidden");
  readmePreview.classList.add("hidden");
  resultSection.classList.add("hidden");
  statusText.textContent = "模块配置已改变，请重新抽奖。";
}

function restoreSlots(savedSlots) {
  return savedSlots.map((slot) => ({
    id: slot.id,
    category: slot.category || slot.categoryKey || slot.id.split("_")[0],
    label: slot.label || getSlotLabel(slot.category || slot.id.split("_")[0], Number(slot.id.split("_").pop()) || 1),
    removable: Boolean(slot.removable),
    selectedPart: slot.selectedPart || null,
    rerollCount: slot.rerollCount || 0
  }));
}

function createSlotsFromLegacyHardware(hardware = {}) {
  return defaultSlotDefinitions.map((definition) => {
    const slot = createSlot(definition.category, definition.removable, definition.id);
    slot.selectedPart = hardware[definition.category] || null;
    return slot;
  });
}

function resetProjectState() {
  projectState.slots.forEach((slot) => {
    slot.selectedPart = null;
    slot.rerollCount = 0;
    projectState.selectedParts[slot.id] = null;
    projectState.rerollCounts[slot.id] = 0;
  });
  projectState.hasGeneratedProject = false;
  projectState.isRolling = false;
  updateRerollControls();
  updateModuleConfigUi();
}

function setProjectStateFromProject(project, resetRerolls = true) {
  projectState.slots = project.slots ? restoreSlots(project.slots) : createSlotsFromLegacyHardware(project.hardware);
  projectState.slots.forEach((slot) => {
    projectState.selectedParts[slot.id] = slot.selectedPart;
    if (resetRerolls) {
      slot.rerollCount = 0;
    }
    projectState.rerollCounts[slot.id] = slot.rerollCount || 0;
  });
  projectState.hasGeneratedProject = Boolean(project && project.hardware);
  projectState.isRolling = false;
  initEmptyTracks();
  renderSelectedPartsOnTracks();
  updateRerollControls();
  updateModuleConfigUi();
}

function renderSelectedPartsOnTracks() {
  projectState.slots.forEach((slot) => {
    const trackEl = getTrackElement(slot.id);
    const item = slot.selectedPart || projectState.selectedParts[slot.id];
    if (!trackEl || !item) return;
    const labelEl = trackEl.querySelector(".track-result") || trackEl.querySelector(".module-name span");
    if (labelEl) {
      labelEl.textContent = `当前：${item.rarityLabel || ""} ${item.name}`.trim();
    }
  });
}

function setRollingState(isRolling) {
  projectState.isRolling = isRolling;
  startBtn.disabled = isRolling;
  updateRerollControls();
  updateModuleConfigUi();
}

function updateRerollControls() {
  projectState.slots.forEach((slot) => {
    const trackEl = getTrackElement(slot.id);
    if (!trackEl) return;
    const headerEl = trackEl.querySelector(".module-name");
    if (!headerEl) return;

    let resultEl = headerEl.querySelector(".track-result");
    const oldStatusEl = headerEl.querySelector("span:not(.track-result):not(.reroll-count)");
    if (!resultEl && oldStatusEl) {
      oldStatusEl.classList.add("track-result");
      resultEl = oldStatusEl;
    }

    let countEl = headerEl.querySelector(".reroll-count");
    if (!countEl) {
      countEl = document.createElement("span");
      countEl.className = "reroll-count";
      headerEl.appendChild(countEl);
    }

    let buttonEl = headerEl.querySelector(".reroll-button");
    if (!buttonEl) {
      buttonEl = document.createElement("button");
      buttonEl.className = "reroll-button";
      buttonEl.type = "button";
      buttonEl.dataset.rerollModule = slot.id;
      headerEl.appendChild(buttonEl);
    }

    let addSlotEl = headerEl.querySelector(".add-slot-btn");
    const isPrimaryExpandableSlot = !slot.removable && expandableCategories.includes(slot.category);
    if (isPrimaryExpandableSlot && !addSlotEl) {
      addSlotEl = document.createElement("button");
      addSlotEl.className = "add-slot-btn";
      addSlotEl.type = "button";
      addSlotEl.dataset.addSlot = slot.category;
      headerEl.appendChild(addSlotEl);
    }
    if (!isPrimaryExpandableSlot && addSlotEl) {
      addSlotEl.remove();
      addSlotEl = null;
    }

    let deleteEl = headerEl.querySelector(".delete-slot-button");
    if (slot.removable && !deleteEl) {
      deleteEl = document.createElement("button");
      deleteEl.className = "delete-slot-button remove-slot-btn";
      deleteEl.type = "button";
      deleteEl.dataset.deleteSlot = slot.id;
      deleteEl.textContent = "删除模块";
      headerEl.appendChild(deleteEl);
    }
    if (!slot.removable && !headerEl.querySelector(".default-slot-badge")) {
      const badge = document.createElement("span");
      badge.className = "default-slot-badge";
      badge.textContent = "默认模块";
      headerEl.appendChild(badge);
    }
    if (deleteEl) deleteEl.disabled = projectState.isRolling;

    const used = slot.rerollCount || projectState.rerollCounts[slot.id] || 0;
    const remaining = Math.max(0, projectState.maxRerolls - used);
    countEl.textContent = remaining > 0 ? `剩余重抽 ${remaining} 次` : "重抽次数已用完";

    const canReroll = projectState.hasGeneratedProject && !projectState.isRolling && remaining > 0;
    buttonEl.disabled = !canReroll;
    buttonEl.textContent = projectState.isRolling ? "重抽中…" : (remaining > 0 ? "重抽" : "已用完");

    if (addSlotEl) {
      const categoryCount = projectState.slots.filter((item) => item.category === slot.category).length;
      const isFull = projectState.slots.length >= maxModuleSlots;
      const isLimit = categoryCount >= 3;
      addSlotEl.disabled = projectState.isRolling || isFull || isLimit;
      addSlotEl.textContent = isFull ? "模块数已满" : (isLimit ? "已达上限" : `+ 添加${getBaseModule(slot.category).label}`);
    }
  });
}

function startDraw() {
  if (projectState.isRolling) return;
  cancelAnimationFrame(animationFrameId);
  stopTickLoop();
  initAudio();
  resetProjectState();
  setRollingState(true);
  generatedProject = null;
  resultSection.classList.add("hidden");
  promptBox.classList.add("hidden");
  readmePreview.classList.add("hidden");
  startBtn.disabled = true;
  startBtn.textContent = "抽奖中...";
  statusText.textContent = "6 条模块轨道已同时启动，正在依次停靠...";

  trackStates = createTrackStates();
  renderTracks(trackStates);
  startTickLoop();

  requestAnimationFrame(() => {
    prepareTrackMeasurements(trackStates);
    animateTracks(performance.now());
  });
}

function handleModeClick(event) {
  const button = event.target.closest(".mode-button");
  if (!button || startBtn.disabled) return;
  selectedModeKey = button.dataset.mode;
  modeGrid.querySelectorAll(".mode-button").forEach((item) => {
    item.classList.toggle("active", item === button);
  });
  statusText.textContent = `当前方向：${projectModes[selectedModeKey].label}；策略：${getStrategyLabel()}。点击开始抽奖后，相关硬件出现概率会提高。`;
}

function handleStrategyClick(event) {
  const button = event.target.closest(".strategy-button");
  if (!button || startBtn.disabled) return;
  selectedStrategy = button.dataset.strategy;
  strategySwitch.querySelectorAll(".strategy-button").forEach((item) => {
    item.classList.toggle("active", item === button);
  });
  statusText.textContent = `当前方向：${projectModes[selectedModeKey].label}；策略：${getStrategyLabel()}。`;
}

function handleCollapsibleClick(event) {
  const trigger = event.target.closest(".collapsible-trigger");
  if (!trigger) return;

  const panel = trigger.closest(".collapsible-panel");
  const isCollapsed = panel.classList.toggle("collapsed");
  trigger.setAttribute("aria-expanded", String(!isCollapsed));
  const icon = trigger.querySelector(".collapse-icon");
  if (icon) {
    icon.textContent = isCollapsed ? "展开" : "收起";
  }
}

function togglePoolOverview() {
  poolOverviewVisible = !poolOverviewVisible;
  poolOverview.classList.toggle("hidden", !poolOverviewVisible);
  poolToggleBtn.textContent = poolOverviewVisible ? "收起奖池" : "查看奖池";
  poolToggleBtn.setAttribute("aria-expanded", String(poolOverviewVisible));
  if (poolOverviewVisible) {
    renderPoolOverview();
  }
}

function handlePoolRarityFilterClick(event) {
  const button = event.target.closest("[data-pool-rarity]");
  if (!button) return;
  poolRarityFilter = button.dataset.poolRarity;
  poolRarityFilters.querySelectorAll(".pool-filter-button").forEach((item) => {
    item.classList.toggle("active", item === button);
  });
  renderPoolOverview();
}

function handlePoolCategoryToggle(event) {
  const button = event.target.closest("[data-pool-category]");
  if (!button) return;
  const categoryKey = button.dataset.poolCategory;
  if (collapsedPoolCategories.has(categoryKey)) {
    collapsedPoolCategories.delete(categoryKey);
  } else {
    collapsedPoolCategories.add(categoryKey);
  }
  renderPoolOverview();
}

function renderPoolOverview() {
  if (!poolOverviewVisible) return;
  const allItems = getAllPoolItems();
  const visibleItems = filterPoolItems(allItems);
  renderPoolStats(allItems, visibleItems);
  poolContent.innerHTML = modulePools.map((module) => renderCategoryPool(module.key, visibleItems)).join("");
}

function renderCategoryPool(categoryKey, visibleItems) {
  const module = modulePools.find((item) => item.key === categoryKey);
  const isCollapsed = collapsedPoolCategories.has(categoryKey);
  const moduleItems = visibleItems.filter((item) => item.moduleKey === categoryKey);
  const totalCount = getPoolItemsForModule(module).length;
  const visibleCount = moduleItems.length;

  return `
    <article class="pool-category-card ${isCollapsed ? "collapsed" : ""}">
      <button class="pool-category-header" type="button" data-pool-category="${categoryKey}" aria-expanded="${String(!isCollapsed)}">
        <span>
          <strong>${module.label}</strong>
          <small>${visibleCount}/${totalCount} 个硬件</small>
        </span>
        <span class="pool-collapse-icon">${isCollapsed ? "展开" : "收起"}</span>
      </button>
      <div class="pool-category-body">
        ${["blue", "pink", "gold"].map((rarity) => renderPoolRaritySection(moduleItems, rarity)).join("")}
      </div>
    </article>
  `;
}

function renderPoolRaritySection(items, rarity) {
  const rarityItems = items.filter((item) => item.rarity === rarity);
  return `
    <section class="pool-rarity-section ${rarity}">
      <h3>${getRarityLabel(rarity)} <span>${rarityItems.length} 个</span></h3>
      <div class="pool-item-list">
        ${rarityItems.length > 0
          ? rarityItems.map(renderPoolItem).join("")
          : `<div class="pool-empty">当前筛选下暂无匹配硬件</div>`}
      </div>
    </section>
  `;
}

function renderPoolItem(item) {
  return `
    <div class="pool-item ${item.rarity}">
      <div class="pool-item-main">
        <strong>${item.name}</strong>
        <span>${getRarityLabel(item.rarity)}</span>
      </div>
      <div class="pool-item-meta">
        <span>${item.voltage}</span>
        <span>${formatInterface(item.interface)}</span>
        <span>${getDifficultyLabel(item.difficulty)}</span>
      </div>
      <p>${item.notes}</p>
    </div>
  `;
}

function filterPoolItems(items = getAllPoolItems()) {
  const keyword = poolSearchInput.value.trim().toLowerCase();
  return items.filter((item) => {
    const rarityMatched = poolRarityFilter === "all" || item.rarity === poolRarityFilter;
    const haystack = [
      item.name,
      item.category,
      item.voltage,
      formatInterface(item.interface),
      item.powerLevel,
      item.difficulty,
      item.notes,
      (item.alternatives || []).join(" ")
    ].join(" ").toLowerCase();
    const keywordMatched = !keyword || haystack.includes(keyword);
    return rarityMatched && keywordMatched;
  });
}

function getAllPoolItems() {
  return modulePools.flatMap((module) => getPoolItemsForModule(module));
}

function getPoolItemsForModule(module) {
  return ["blue", "pink", "gold"].flatMap((rarity) => {
    return module.pool[rarity].map((item) => ({
      ...item,
      rarity,
      moduleKey: module.key,
      category: item.category || module.label
    }));
  });
}

function renderPoolStats(allItems, visibleItems) {
  const rarityTotals = countPoolRarities(allItems);
  const visibleTotals = countPoolRarities(visibleItems);
  const moduleStats = modulePools.map((module) => {
    const count = allItems.filter((item) => item.moduleKey === module.key).length;
    return `${module.label} ${count}`;
  }).join(" · ");

  poolStats.innerHTML = `
    <div class="pool-stat-line">
      <strong>当前奖池共 ${allItems.length} 个硬件</strong>
      <span>蓝色 ${rarityTotals.blue} 个，粉色 ${rarityTotals.pink} 个，金色 ${rarityTotals.gold} 个</span>
      <span>当前筛选显示 ${visibleItems.length} 个：蓝色 ${visibleTotals.blue}，粉色 ${visibleTotals.pink}，金色 ${visibleTotals.gold}</span>
    </div>
    <div class="pool-module-stats">${moduleStats}</div>
  `;
}

function countPoolRarities(items) {
  return items.reduce((counts, item) => {
    counts[item.rarity] += 1;
    return counts;
  }, { blue: 0, pink: 0, gold: 0 });
}

function getRarityLabel(rarity) {
  const labels = {
    blue: "蓝色 普通入门",
    pink: "粉色 进阶实用",
    gold: "金色 高级展示"
  };
  return labels[rarity] || rarity;
}

function getDifficultyLabel(difficulty) {
  const labels = {
    easy: "入门",
    medium: "中等",
    hard: "较难"
  };
  return labels[difficulty] || difficulty || "未知";
}

function favoriteCurrentProject() {
  if (!generatedProject) {
    showToast("请先完成一次抽奖再收藏。");
    return;
  }

  const savedProject = {
    ...deepClone(generatedProject),
    historyId: generatedProject.historyId || createHistoryId(),
    savedAt: generatedProject.savedAt || new Date().toISOString()
  };

  const existingIndex = projectHistory.findIndex((item) => item.historyId === savedProject.historyId);
  if (existingIndex >= 0) {
    projectHistory[existingIndex] = savedProject;
  } else {
    projectHistory.unshift(savedProject);
  }

  projectHistory = projectHistory.slice(0, 30);
  generatedProject.historyId = savedProject.historyId;
  generatedProject.savedAt = savedProject.savedAt;
  saveHistory();
  renderHistory();
  showToast("项目已收藏到历史记录。");
}

function exportCurrentProjectJson() {
  if (!generatedProject) {
    showToast("请先完成一次抽奖再导出。");
    return;
  }

  const payload = buildExportPayload(generatedProject);
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slugifyProjectName(generatedProject.name)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast("项目 JSON 已导出。");
}

function importProjectJson(event) {
  const file = event.target.files && event.target.files[0];
  event.target.value = "";
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const project = parseImportedProject(parsed);
      generatedProject = project;
      setProjectStateFromProject(generatedProject);
      renderProjectResult(generatedProject);
      resultSection.classList.remove("hidden");
      promptBox.classList.add("hidden");
      readmePreview.classList.add("hidden");
      resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("项目 JSON 已导入。");
    } catch (error) {
      showToast(error.message || "JSON 格式不正确，导入失败。");
    }
  };
  reader.onerror = () => showToast("读取文件失败。");
  reader.readAsText(file, "utf-8");
}

function buildExportPayload(project) {
  return {
    schema: "mcu-lootbox-project",
    version: 1,
    exportedAt: new Date().toISOString(),
    project: {
      name: project.name,
      modeLabel: project.modeLabel,
      strategyLabel: project.strategyLabel,
      slots: project.slots || null,
      hardware: project.hardware,
      rarityCounts: project.rarityCounts,
      bom: project.bom,
      pinPlan: project.pinPlan,
      roadmap: project.roadmap,
      compatibility: project.compatibility,
      score: project.score,
      difficulty: project.difficulty,
      description: project.description,
      applications: project.applications,
      extensions: project.extensions,
      generatedAt: project.generatedAt || new Date().toISOString()
    }
  };
}

function parseImportedProject(parsed) {
  const project = parsed && parsed.project ? parsed.project : parsed;
  validateImportedProject(project);
  if (!project.slots) {
    project.slots = createSlotsFromLegacyHardware(project.hardware);
  }

  return {
    ...project,
    strategyLabel: project.strategyLabel || "随机娱乐模式",
    historyId: project.historyId || null,
    savedAt: project.savedAt || null,
    generatedAt: project.generatedAt || new Date().toISOString()
  };
}

function validateImportedProject(project) {
  if (!project || typeof project !== "object") {
    throw new Error("导入失败：JSON 根对象无效。");
  }

  const requiredFields = ["name", "hardware", "bom", "compatibility", "score", "difficulty"];
  const missing = requiredFields.filter((field) => project[field] === undefined || project[field] === null);
  if (missing.length > 0) {
    throw new Error(`导入失败：缺少字段 ${missing.join("、")}。`);
  }

  const requiredHardware = ["controller", "sensor", "display", "communication", "storage", "actuator"];
  const missingHardware = requiredHardware.filter((key) => !project.hardware[key] || !project.hardware[key].name);
  if (missingHardware.length > 0) {
    throw new Error(`导入失败：硬件模块不完整，缺少 ${missingHardware.join("、")}。`);
  }

  if (!Array.isArray(project.bom)) {
    throw new Error("导入失败：BOM 表必须是数组。");
  }

  if (!project.compatibility.title || !project.compatibility.status) {
    throw new Error("导入失败：兼容性分析格式不完整。");
  }

  if (typeof project.score !== "number" || project.score < 0 || project.score > 100) {
    throw new Error("导入失败：评分必须是 0 到 100 的数字。");
  }

  if (typeof project.difficulty !== "string") {
    throw new Error("导入失败：难度字段格式不正确。");
  }
}

function handleHistoryClick(event) {
  const button = event.target.closest("[data-history-action]");
  if (!button) return;

  const historyId = button.dataset.historyId;
  const project = projectHistory.find((item) => item.historyId === historyId);
  if (!project) return;

  const action = button.dataset.historyAction;
  if (action === "view") {
    generatedProject = deepClone(project);
    setProjectStateFromProject(generatedProject);
    renderProjectResult(generatedProject);
    resultSection.classList.remove("hidden");
    promptBox.classList.add("hidden");
    readmePreview.classList.add("hidden");
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("已重新打开收藏项目。");
  }

  if (action === "copy") {
    copyText(buildMarkdown(project), "历史项目 Markdown 已复制。");
  }

  if (action === "delete") {
    projectHistory = projectHistory.filter((item) => item.historyId !== historyId);
    saveHistory();
    renderHistory();
    showToast("历史记录已删除。");
  }
}

function loadHistory() {
  try {
    const raw = localStorage.getItem("mcuLootBoxHistory");
    projectHistory = raw ? JSON.parse(raw) : [];
  } catch (error) {
    projectHistory = [];
  }
}

function saveHistory() {
  try {
    localStorage.setItem("mcuLootBoxHistory", JSON.stringify(projectHistory));
  } catch (error) {
    showToast("浏览器存储空间不足，收藏失败。");
  }
}

function renderHistory() {
  if (projectHistory.length === 0) {
    historyList.innerHTML = `<div class="empty-history">暂无收藏项目。</div>`;
    return;
  }

  historyList.innerHTML = projectHistory.map((project) => `
    <article class="history-item">
      <div class="history-info">
        <strong>${project.name}</strong>
        <div class="history-meta">
          <span>评分：${project.score}</span>
          <span>难度：${project.difficulty}</span>
          <span>方向：${project.modeLabel || "未记录"}</span>
          <span>策略：${project.strategyLabel || "随机娱乐模式"}</span>
          <span>时间：${formatHistoryTime(project.savedAt)}</span>
        </div>
      </div>
      <div class="history-actions">
        <button class="history-button" type="button" data-history-action="view" data-history-id="${project.historyId}">查看</button>
        <button class="history-button" type="button" data-history-action="copy" data-history-id="${project.historyId}">复制 Markdown</button>
        <button class="history-button danger" type="button" data-history-action="delete" data-history-id="${project.historyId}">删除</button>
      </div>
    </article>
  `).join("");
}

function createHistoryId() {
  return `project-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatHistoryTime(value) {
  if (!value) return "未知";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "未知";
  return date.toLocaleString("zh-CN", { hour12: false });
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createTrackStates() {
  const context = {};
  return projectState.slots.map((slot, index) => {
    const module = createModuleFromSlot(slot, index);
    const state = createTrackState(module, context);
    context[slot.category] = state.winner;
    return state;
  });
}

function createTrackState(module, context) {
  const itemCount = randomInt(40, 60);
  const winnerIndex = randomInt(Math.floor(itemCount * 0.74), itemCount - 7);
  const winner = createHardwareItem(module, context);
  const items = Array.from({ length: itemCount }, (_, index) => {
    return index === winnerIndex ? winner : createHardwareItem(module, context);
  });

  return {
    module,
    items,
    winner,
    winnerIndex,
    startX: 0,
    targetX: 0,
    startTime: 0,
    stopped: false
  };
}

function createHardwareItem(module, context = {}) {
  const rarityKey = pickRarity();
  const hardware = pickWeightedHardware(module, rarityKey, selectedModeKey, context);
  const name = getHardwareName(hardware);
  const metaInfo = normalizeHardwareMeta(hardware, name);
  const categoryKey = module.categoryKey || module.key;
  return {
    moduleKey: module.key,
    categoryKey,
    moduleLabel: module.label,
    name,
    rarityKey,
    rarityLabel: rarityConfig[rarityKey].label,
    rarityTitle: rarityConfig[rarityKey].title,
    voltage: metaInfo.voltage,
    interface: metaInfo.interface,
    powerLevel: metaInfo.powerLevel,
    difficulty: metaInfo.difficulty,
    notes: metaInfo.notes,
    alternatives: metaInfo.alternatives
  };
}

function renderTracks(states) {
  tracksContainer.innerHTML = states.map((state) => `
    <div class="module-track" data-module-key="${state.module.key}">
      <div class="module-name">
        <strong>${state.module.label}</strong>
        <span>滚动中</span>
      </div>
      <div class="track-window">
        <div class="track-pointer" aria-hidden="true"></div>
        <div class="track-strip">
          ${state.items.map((item, index) => renderHardwareCard(item, index)).join("")}
        </div>
      </div>
    </div>
  `).join("");
  updateRerollControls();
}

function renderHardwareCard(item, index) {
  const config = rarityConfig[item.rarityKey];
  return `
    <article class="hardware-card ${config.className}" data-item-index="${index}">
      <span class="badge ${config.colorClass}">${item.rarityLabel}</span>
      <strong>${item.name}</strong>
    </article>
  `;
}

function prepareTrackMeasurements(states) {
  states.forEach((state) => {
    const trackEl = getTrackElement(state.module.key);
    const windowEl = trackEl.querySelector(".track-window");
    const stripEl = trackEl.querySelector(".track-strip");
    const winnerEl = stripEl.querySelector(`[data-item-index="${state.winnerIndex}"]`);
    const windowCenter = windowEl.getBoundingClientRect().width / 2;
    const winnerCenter = winnerEl.offsetLeft + winnerEl.offsetWidth / 2;

    state.startX = Math.min(260, windowEl.getBoundingClientRect().width * 0.24);
    state.targetX = windowCenter - winnerCenter;
    state.startTime = performance.now();
    state.stopped = false;
    stripEl.style.transform = `translateX(${state.startX}px)`;
  });
}

function animateTracks(now) {
  let allStopped = true;

  trackStates.forEach((state) => {
    const trackEl = getTrackElement(state.module.key);
    const stripEl = trackEl.querySelector(".track-strip");
    const progress = Math.min((now - state.startTime) / state.module.stopMs, 1);
    const x = state.startX + (state.targetX - state.startX) * easeOutQuint(progress);

    stripEl.style.transform = `translateX(${x}px)`;

    if (progress >= 1 && !state.stopped) {
      stopTrack(state);
    }

    if (!state.stopped) {
      allStopped = false;
    }
  });

  if (!allStopped) {
    animationFrameId = requestAnimationFrame(animateTracks);
    return;
  }

  finishAllTracks();
}

function stopTrack(state) {
  state.stopped = true;
  const trackEl = getTrackElement(state.module.key);
  const stripEl = trackEl.querySelector(".track-strip");
  const winnerEl = stripEl.querySelector(`[data-item-index="${state.winnerIndex}"]`);
  const labelEl = trackEl.querySelector(".track-result") || trackEl.querySelector(".module-name span");

  stripEl.style.transform = `translateX(${state.targetX}px)`;
  winnerEl.classList.add("winner");
  labelEl.textContent = `抽中：${state.winner.rarityLabel} ${state.winner.name}`;
  statusText.textContent = `${state.module.label} 已停靠：${state.winner.name}`;
  playStopSound(state.winner.rarityKey);
  updateRerollControls();
}

function finishAllTracks() {
  stopTickLoop();
  trackStates.forEach((state) => {
    const slot = getSlotById(state.module.key);
    if (slot) {
      slot.selectedPart = state.winner;
      projectState.selectedParts[slot.id] = state.winner;
    }
  });
  projectState.hasGeneratedProject = true;
  generatedProject = buildProjectFromWinners(getSelectedWinners());
  renderProjectResult(generatedProject);
  resultSection.classList.remove("hidden");
  statusText.textContent = "项目生成完成。";
  setRollingState(false);
  startBtn.textContent = "重新开始抽奖";
  playCompleteSound();
}

function handleTrackRerollClick(event) {
  const addButton = event.target.closest("[data-add-slot]");
  if (addButton) {
    addSlot(addButton.dataset.addSlot);
    return;
  }
  const deleteButton = event.target.closest("[data-delete-slot]");
  if (deleteButton) {
    deleteCustomSlot(deleteButton.dataset.deleteSlot);
    return;
  }
  const button = event.target.closest("[data-reroll-module]");
  if (!button) return;
  rerollModule(button.dataset.rerollModule);
}

function rerollModule(slotId) {
  if (!projectState.hasGeneratedProject || projectState.isRolling) return;
  const slot = getSlotById(slotId);
  if (!slot) return;
  const used = slot.rerollCount || 0;
  if (used >= projectState.maxRerolls) {
    showToast("该模块重抽次数已用完。");
    updateRerollControls();
    return;
  }

  const module = createModuleFromSlot(slot, projectState.slots.indexOf(slot));
  const trackEl = getTrackElement(slotId);
  if (!module || !trackEl) return;

  initAudio();
  stopTickLoop();
  setRollingState(true);
  startBtn.textContent = "重抽中…";
  statusText.textContent = `${module.label} 正在单模块重抽…`;

  const context = createContextFromSlots();
  const rerollState = createTrackState({ ...module, stopMs: 3600 }, context);
  const existingIndex = trackStates.findIndex((state) => state.module.key === slotId);
  if (existingIndex >= 0) {
    trackStates[existingIndex] = rerollState;
  } else {
    trackStates.push(rerollState);
  }

  renderSingleTrackState(rerollState);
  startTickLoop();

  requestAnimationFrame(() => {
    prepareTrackMeasurements([rerollState]);
    animateSingleReroll(rerollState);
  });
}

function renderSingleTrackState(state) {
  const trackEl = getTrackElement(state.module.key);
  const stripEl = trackEl.querySelector(".track-strip");
  const labelEl = trackEl.querySelector(".track-result") || trackEl.querySelector(".module-name span");
  stripEl.innerHTML = state.items.map((item, index) => renderHardwareCard(item, index)).join("");
  stripEl.style.transform = "translateX(0)";
  if (labelEl) labelEl.textContent = "重抽中…";
  trackEl.classList.remove("reroll-updated");
}

function animateSingleReroll(state) {
  const now = performance.now();
  const trackEl = getTrackElement(state.module.key);
  const stripEl = trackEl.querySelector(".track-strip");
  const progress = Math.min((now - state.startTime) / state.module.stopMs, 1);
  const x = state.startX + (state.targetX - state.startX) * easeOutQuint(progress);

  stripEl.style.transform = `translateX(${x}px)`;

  if (progress < 1) {
    animationFrameId = requestAnimationFrame(() => animateSingleReroll(state));
    return;
  }

  stopTrack(state);
  finishSingleReroll(state);
}

function finishSingleReroll(state) {
  stopTickLoop();
  const slot = getSlotById(state.module.key);
  if (slot) {
    slot.selectedPart = state.winner;
    slot.rerollCount = (slot.rerollCount || 0) + 1;
    projectState.selectedParts[slot.id] = state.winner;
    projectState.rerollCounts[slot.id] = slot.rerollCount;
  }
  projectState.hasGeneratedProject = true;
  const previousHistoryId = generatedProject && generatedProject.historyId;
  const previousSavedAt = generatedProject && generatedProject.savedAt;
  generatedProject = buildProjectFromWinners(getSelectedWinners());
  if (previousHistoryId) {
    generatedProject.historyId = previousHistoryId;
    generatedProject.savedAt = previousSavedAt || new Date().toISOString();
    const historyIndex = projectHistory.findIndex((item) => item.historyId === previousHistoryId);
    if (historyIndex >= 0) {
      projectHistory[historyIndex] = deepClone(generatedProject);
      saveHistory();
      renderHistory();
    }
  }
  renderProjectResult(generatedProject);
  promptBox.classList.add("hidden");
  readmePreview.classList.add("hidden");
  resultSection.classList.remove("hidden");
  setRollingState(false);
  startBtn.textContent = "重新开始抽奖";
  statusText.textContent = `${state.module.label} 已重抽完成：${state.winner.name}`;
  const trackEl = getTrackElement(state.module.key);
  trackEl.classList.add("reroll-updated");
  window.setTimeout(() => trackEl.classList.remove("reroll-updated"), 900);
}

function getSelectedWinners() {
  return projectState.slots.map((slot) => slot.selectedPart || projectState.selectedParts[slot.id]).filter(Boolean);
}

function createContextFromSlots() {
  const context = {};
  projectState.slots.forEach((slot) => {
    if (slot.selectedPart && !context[slot.category]) {
      context[slot.category] = slot.selectedPart;
    }
  });
  return context;
}

function buildProjectFromWinners(winners) {
  const slotItems = projectState.slots.map((slot) => ({
    id: slot.id,
    category: slot.category,
    label: slot.label,
    removable: slot.removable,
    rerollCount: slot.rerollCount || 0,
    selectedPart: slot.selectedPart || projectState.selectedParts[slot.id] || winners.find((item) => item.moduleKey === slot.id) || null
  }));
  const hardware = {};
  slotItems.forEach((slot) => {
    if (slot.selectedPart && !hardware[slot.category]) {
      hardware[slot.category] = slot.selectedPart;
    }
  });
  const rarityCounts = countRarities(winners);
  const project = {
    hardware,
    slots: slotItems,
    rarityCounts,
    modeLabel: projectModes[selectedModeKey].label,
    strategyLabel: getStrategyLabel()
  };

  project.name = generateProjectName(project);
  project.difficulty = generateDifficulty(rarityCounts);
  project.score = generateScore(project);
  project.description = generateDescription(project);
  project.applications = generateApplications(project);
  project.extensions = generateExtensions(project);
  project.compatibility = analyzeCompatibility(project);
  project.bom = generateBom(project);
  project.pinPlan = generateStm32F103PinPlan(project);
  project.roadmap = generateRoadmap(project);
  project.historyId = null;
  project.savedAt = null;
  project.generatedAt = new Date().toISOString();
  return project;
}

function getProjectSlots(project) {
  if (project.slots && Array.isArray(project.slots)) return project.slots;
  return createSlotsFromLegacyHardware(project.hardware || {});
}

function getProjectHardwareItems(project) {
  return getProjectSlots(project).map((slot) => slot.selectedPart).filter(Boolean);
}

function getPrimaryPart(project, category) {
  return project.hardware[category] || getProjectSlots(project).find((slot) => slot.category === category && slot.selectedPart)?.selectedPart;
}

function generateProjectName(project) {
  const { controller, sensor, display, communication, actuator } = project.hardware;
  const controllerFamily = getControllerFamily(controller.name);

  if (isOneOf(sensor.name, ["MPU6050", "ICM20948姿态传感器", "倾斜开关", "AS5600磁编码器"]) && hasBluetooth(communication.name)) {
    return `基于 ${controllerFamily} 的蓝牙姿态监测终端`;
  }
  if (isOneOf(sensor.name, ["AHT20", "DHT11", "BME280", "BMP280", "SHT31", "NTC温度传感器", "DS18B20", "MLX90614红外测温"]) && hasDisplay(display.name)) {
    return "桌面环境监测仪";
  }
  if (isOneOf(sensor.name, ["超声波测距模块", "红外避障模块", "VL53L0X激光测距"]) && hasMotion(actuator.name)) {
    return "智能避障控制装置";
  }
  if (isOneOf(sensor.name, ["BME280", "BMP280", "SHT31", "AHT20", "CCS811空气质量传感器"]) && hasCloudOrWifi(communication.name)) {
    return "云端环境数据记录仪";
  }
  if (sensor.name === "光敏电阻" && (display.name.includes("LED") || actuator.name.includes("LED"))) {
    return "智能光照提醒器";
  }
  if (sensor.name === "MQ气体传感器" && (display.name.includes("蜂鸣器") || actuator.name.includes("蜂鸣器"))) {
    return "空气异常报警器";
  }
  if (sensor.name === "INA219电流传感器") {
    return "电源电流监测记录仪";
  }
  if (sensor.name === "MAX30102心率血氧") {
    return "桌面健康数据采集终端";
  }
  if (sensor.name === "TCS34725颜色传感器") {
    return "颜色识别交互控制器";
  }
  if (sensor.name === "APDS-9960手势传感器") {
    return "手势交互控制台";
  }
  if (sensor.name === "AS5600磁编码器" && hasMotion(actuator.name)) {
    return "电机角度反馈控制装置";
  }
  if (sensor.name.includes("测距") && hasDisplay(display.name)) {
    return "高精度测距显示终端";
  }
  if (hasCloudOrWifi(communication.name)) {
    return `基于 ${controllerFamily} 的联网${sensor.name.replace("模块", "")}终端`;
  }
  return `${sensor.name.replace("模块", "")}嵌入式控制终端`;
}

function generateDifficulty(counts) {
  if (counts.gold >= 2) return "较难";
  if (counts.pink >= 3) return "中等偏上";
  if (counts.gold === 1 || counts.pink >= 2) return "中等";
  return "入门";
}

function generateScore(project) {
  const winners = getProjectHardwareItems(project);
  const counts = project.rarityCounts;
  let score = 35 + counts.blue * 5 + counts.pink * 9 + counts.gold * 14;

  if (project.hardware.communication) score += 5;
  if (project.hardware.storage.name !== "无外部存储") score += 5;
  if (hasDisplay(project.hardware.display.name)) score += 5;
  if (project.hardware.actuator) score += 5;
  if (winners.some((item) => item.rarityKey === "gold")) score += 2;

  return Math.min(100, score);
}

function generateDescription(project) {
  const { controller, sensor, display, communication, storage, actuator } = project.hardware;
  const sensorUse = describeSensor(sensor.name);
  const storageText = storage.name === "无外部存储"
    ? "本地不依赖外部存储，适合保持系统轻量"
    : `同时使用 ${storage.name} 保存参数、日志或历史数据`;

  return `该项目基于 ${controller.name}，使用 ${sensor.name}${sensorUse}，通过 ${display.name} 显示状态或进行人机交互，并通过 ${communication.name} 实现调试、联网或远程控制，${storageText}，再结合 ${actuator.name} 完成提醒、驱动或执行动作，适合做课程设计、桌面工具或开源项目原型。`;
}

function generateApplications(project) {
  const sensor = project.hardware.sensor.name;
  if (sensor.includes("姿态")) return "姿态报警、震动检测、桌面状态监测、运动数据记录";
  if (sensor.includes("气体")) return "空气质量报警、实验室安全提醒、厨房环境监测";
  if (sensor.includes("空气质量")) return "空气质量监测、室内环境评估、云端环境看板";
  if (sensor.includes("测距") || sensor.includes("避障")) return "智能避障、距离显示、自动门禁、机器人感知";
  if (sensor.includes("光敏")) return "光照提醒、自动灯控、低功耗环境节点";
  if (sensor.includes("颜色")) return "颜色识别、分拣演示、交互灯光控制";
  if (sensor.includes("手势")) return "非接触控制、桌面控制台、菜单交互";
  if (sensor.includes("电流")) return "电源监测、低功耗评估、设备运行状态记录";
  if (sensor.includes("心率")) return "生理数据学习演示、信号采集算法实验";
  if (sensor.includes("磁编码器")) return "角度检测、电机位置反馈、旋钮交互";
  if (["AHT20", "DHT11", "BME280", "BMP280", "SHT31", "NTC温度传感器", "DS18B20", "MLX90614红外测温"].includes(sensor)) return "桌面环境监测、温湿度记录、云端数据看板";
  return "嵌入式课程设计、传感器采集终端、可扩展开源硬件项目";
}

function generateExtensions(project) {
  const suggestions = [
    "增加硬件兼容性检查清单，核对电压、电流、接口和电平转换。",
    "补充按键菜单、异常报警阈值和掉电保存逻辑。",
    "设计模块化驱动层，便于替换传感器、显示屏或通信模块。"
  ];

  if (hasCloudOrWifi(project.hardware.communication.name)) {
    suggestions.push("扩展云端数据看板、远程参数配置和 OTA 升级。");
  }
  if (project.hardware.storage.name !== "无外部存储") {
    suggestions.push("增加 CSV/JSON 日志导出和历史曲线回放。");
  }
  if (project.hardware.actuator.rarityKey !== "blue") {
    suggestions.push("加入闭环控制、运动保护和执行器故障检测。");
  }

  return suggestions.join(" ");
}

function analyzeCompatibility(project) {
  const hardwareItems = getProjectHardwareItems(project);
  const controller = getPrimaryPart(project, "controller");
  const warnings = [];
  const risks = [];
  const passes = [];

  const controllerIs33V = is3v3Controller(controller);
  const controllerIs5V = is5vController(controller);
  const fiveVoltLogicItems = hardwareItems.filter((item) => item !== controller && isStrict5V(item.voltage) && usesLogicInterface(item.interface));
  const highPowerItems = hardwareItems.filter((item) => item.powerLevel === "high");
  const hardItems = hardwareItems.filter((item) => item.difficulty === "hard");
  const interfaceCounts = countInterfaces(hardwareItems);
  const unsupported = findUnsupportedInterfaces(controller, hardwareItems);

  if (controllerIs33V && fiveVoltLogicItems.length > 0) {
    risks.push(`主控核心 ${controller.name} 是 3.3V 逻辑，但 ${fiveVoltLogicItems.map((item) => item.name).join("、")} 可能输出或需要 5V 逻辑信号。不要直接相连，建议加电平转换、分压或选择 3.3V 兼容模块。`);
  } else {
    passes.push("主控与主要数字模块的逻辑电平没有明显硬冲突。");
  }

  if (controllerIs5V) {
    const sensitive33VItems = hardwareItems.filter((item) => item !== controller && item.voltage === "3.3V" && usesLogicInterface(item.interface));
    if (sensitive33VItems.length > 0) {
      warnings.push(`${controller.name} 常用 5V 逻辑，而 ${sensitive33VItems.map((item) => item.name).join("、")} 是 3.3V 模块。主控输出到这些模块前建议加电平转换，避免烧坏模块。`);
    }
  }

  const busNotes = buildInterfaceNotes(interfaceCounts);
  warnings.push(...busNotes.warnings);
  passes.push(...busNotes.passes);

  if (unsupported.length > 0) {
    warnings.push(`${controller.name} 的原生接口可能不完全覆盖：${unsupported.join("、")}。可以考虑软件模拟、换引脚方案、外接桥接芯片，或更换接口资源更丰富的主控。`);
  }

  if (highPowerItems.length > 0) {
    warnings.push(`组合中包含高功耗模块：${highPowerItems.map((item) => item.name).join("、")}。建议准备额外电源模块或独立供电，并确保所有电源共地。`);
  } else {
    passes.push("未发现明显高功耗执行器或通信模块，供电压力相对较小。");
  }

  if (needsExtraPower(project)) {
    warnings.push("该组合建议不要只依赖开发板 USB 口供电，至少为高功耗模块单独准备稳压电源，并预留足够电流余量。");
  }

  if (needsLevelShifter(controller, hardwareItems)) {
    warnings.push("建议准备电平转换模块或分压电路，尤其是 UART、GPIO、I2C、SPI 等信号线。");
  }

  if (hardItems.length > 0 || project.rarityCounts.gold >= 2) {
    warnings.push(`该组合包含较难模块：${hardItems.map((item) => item.name).join("、") || "多个金色硬件"}。新手建议先分别跑通每个模块例程，再整合成完整项目。`);
  } else if (project.rarityCounts.pink >= 3) {
    warnings.push("该组合有多个进阶模块，新手可以制作，但建议按“主控点灯 -> 传感器读取 -> 显示 -> 通信/存储 -> 执行器”的顺序分步调试。");
  } else {
    passes.push("整体难度对新手比较友好，适合分模块逐步制作。");
  }

  const realisticAdvice = buildRealisticAdvice(project);
  warnings.push(...realisticAdvice.warnings);
  risks.push(...realisticAdvice.risks);
  passes.push(...realisticAdvice.passes);

  const status = risks.length > 0 ? "red" : warnings.length > 0 ? "yellow" : "green";
  const titleMap = {
    green: "基本可行",
    yellow: "需要注意",
    red: "不建议直接制作"
  };

  return {
    status,
    title: titleMap[status],
    risks,
    warnings,
    passes,
    summary: buildCompatibilitySummary(status, risks, warnings, passes)
  };
}

function generateBom(project) {
  const { controller, sensor, display, communication, storage, actuator } = project.hardware;
  const legacyBaseItems = [
    createBomItem("主控核心", controller, true),
    createBomItem("感知模块", sensor, true),
    createBomItem("显示交互", display, true),
    createBomItem("通信模块", communication, true),
    createBomItem("存储模块", storage, storage.name !== "无外部存储"),
    createBomItem("执行器/输出模块", actuator, true)
  ];

  const baseItems = getProjectSlots(project)
    .filter((slot) => slot.selectedPart)
    .map((slot) => createBomItem(slot.label, slot.selectedPart, slot.category !== "storage" || !slot.selectedPart.name.includes("无外部存储")));

  const supportItems = [
    {
      category: "基础连接",
      name: "杜邦线 / 面包板 / 排针",
      quantity: "1 套",
      interface: "通用连接",
      voltage: "按项目电压",
      keywords: "杜邦线 面包板 排针 2.54mm",
      required: true,
      alternatives: "洞洞板、PCB、端子线",
      notes: "用于原型搭建，正式制作建议改为焊接或 PCB。"
    }
  ];

  if (needsLevelShifter(controller, getProjectHardwareItems(project))) {
    supportItems.push({
      category: "电平转换",
      name: "双向电平转换模块",
      quantity: "1 个",
      interface: "GPIO / I2C / UART / SPI",
      voltage: "3.3V / 5V",
      keywords: "双向电平转换模块 3.3V 5V I2C UART SPI",
      required: true,
      alternatives: "电阻分压、74LVC245、TXS0108E",
      notes: "用于 3.3V 主控和 5V 模块之间的信号转换。"
    });
  }

  if (needsExtraPower(project)) {
    supportItems.push({
      category: "电源模块",
      name: "独立稳压电源模块",
      quantity: "1 个",
      interface: "电源",
      voltage: "按负载选择",
      keywords: "DC-DC 降压模块 5V 3.3V 稳压 大电流",
      required: true,
      alternatives: "AMS1117 模块、MP1584、LM2596、USB-C 电源模块",
      notes: "高功耗模块不要直接从主控板 IO 或小电流 3.3V 引脚取电。"
    });
  }

  if (actuator.powerLevel === "high" || hasMotion(actuator.name)) {
    supportItems.push({
      category: "驱动保护",
      name: "执行器驱动/保护器件",
      quantity: "1 套",
      interface: actuator.interface,
      voltage: actuator.voltage,
      keywords: `${actuator.name} 驱动模块 MOS管 续流二极管`,
      required: true,
      alternatives: "三极管驱动、MOS 管驱动、专用电机驱动板",
      notes: "电机、继电器、舵机等负载不建议直接由主控 IO 驱动。"
    });
  }

  if (hasDisplay(display.name) || hasInterface(sensor.interface, "ADC")) {
    supportItems.push({
      category: "基础元件",
      name: "电阻/限流/分压元件",
      quantity: "若干",
      interface: "GPIO / ADC",
      voltage: "按电路设计",
      keywords: "电阻包 限流电阻 分压电阻 10K 220R",
      required: true,
      alternatives: "电位器、电阻阵列",
      notes: "LED、蜂鸣器、ADC 分压和 5V Echo 分压常用。"
    });
  }

  return baseItems.concat(supportItems);
}

function generateRoadmap(project) {
  const { controller, sensor, display, communication, storage, actuator } = project.hardware;
  const stages = [
    {
      title: "阶段一：最小系统验证",
      target: `确认 ${controller.name} 能正常供电、下载程序、运行基础固件，并输出串口调试信息。`,
      test: "烧录 LED 闪烁或串口 Hello World 程序，测量 3.3V/5V 电源是否稳定。",
      success: "程序可重复下载，串口日志稳定输出，主控不复位，基础电源无明显跌落。"
    },
    {
      title: "阶段二：单个传感器读取",
      target: `单独接入 ${sensor.name}，完成初始化、原始数据读取和简单滤波。`,
      test: `只连接主控和 ${sensor.name}，通过串口连续打印采样值，并人为改变环境或姿态观察数据变化。`,
      success: "数据能稳定刷新，变化趋势符合预期，异常值有基础处理。"
    },
    {
      title: "阶段三：显示模块调试",
      target: `接入 ${display.name}，显示传感器数据、运行状态和错误提示。`,
      test: `显示固定文本、刷新计数器，再显示 ${sensor.name} 的实时数据。`,
      success: "显示内容无明显乱码或闪烁，刷新频率可接受，不影响传感器读取。"
    },
    {
      title: "阶段四：通信模块调试",
      target: `接入 ${communication.name}，完成基础数据发送、接收或远程查看。`,
      test: "先发送固定测试字符串，再发送传感器数据；如果是无线/联网模块，测试断线重连。",
      success: "通信链路可稳定传输数据，断开后能恢复，错误状态可被记录或显示。"
    }
  ];

  if (storage.name !== "无外部存储") {
    stages.push({
      title: "阶段五：存储/日志功能",
      target: `使用 ${storage.name} 保存配置、采样数据或运行日志。`,
      test: "写入一条测试记录，断电重启后读取；连续写入多条日志，检查顺序和完整性。",
      success: "数据可写入、可读取，异常断电后不会导致主流程崩溃。"
    });
  }

  stages.push(
    {
      title: "阶段六：执行器/报警功能",
      target: `接入 ${actuator.name}，根据传感器阈值、通信命令或系统状态执行动作。`,
      test: "先用低频率、短时间动作测试，再加入阈值触发和保护逻辑。",
      success: "执行器动作符合预期，不导致主控复位、电源跌落或模块过热。"
    },
    {
      title: "阶段七：整体联调",
      target: "把采集、显示、通信、存储和输出控制整合成完整业务流程。",
      test: "连续运行 30 分钟以上，观察串口日志、显示内容、通信状态、存储记录和执行器动作。",
      success: "系统能稳定运行，异常状态有提示，关键数据不丢失，重新上电后能恢复工作。"
    },
    {
      title: "阶段八：PCB、外壳、开源文档整理",
      target: "整理原理图、接线表、BOM、README、测试步骤和后续扩展计划。",
      test: "按 README 从零复现一次搭建流程，检查图片、表格、代码路径和注意事项是否完整。",
      success: "别人能根据文档复现项目，硬件连接清晰，风险提示明确，项目适合发布到 GitHub 或开源平台。"
    }
  );

  return stages;
}

function generateStm32F103PinPlan(project) {
  if (project.hardware.controller.name !== "STM32F103C8T6") {
    return null;
  }

  const pinDefaults = {
    I2C: { pins: "PB6=SCL，PB7=SDA", note: "可以挂在同一组 I2C 总线上，但地址不能冲突。" },
    UART: [{ pins: "PA9=TX，PA10=RX", used: false }, { pins: "PA2=TX，PA3=RX", used: false }],
    SPI: { bus: "PA5=SCK，PA6=MISO，PA7=MOSI", csPins: ["PA4", "PB12", "PB13", "PB14", "PB15"], csIndex: 0 },
    ADC: ["PA0", "PA1", "PA2"],
    PWM: ["PA8", "PB0", "PB1"],
    GPIO: ["PB12", "PB13", "PB14", "PB15"]
  };

  const rows = [];
  const notes = [];
  const modules = getProjectHardwareItems(project).filter((item) => item.categoryKey !== "controller" && item.moduleKey !== "controller_1");
  const i2cModules = modules.filter((item) => needsInterface(item, "I2C"));

  if (i2cModules.length > 1) {
    notes.push("多个模块共用 I2C：可以全部接 PB6/PB7，但要确认模块地址不能冲突，并且上拉电阻接到 3.3V。");
  }

  modules.forEach((item) => {
    const interfaces = getPreferredInterfaces(item);
    if (interfaces.length === 0) {
      rows.push(createPinRow(item, "电源/内部资源", "按模块供电连接", "该模块不需要额外信号线，重点检查供电和共地。"));
      return;
    }

    interfaces.forEach((interfaceName) => {
      if (interfaceName === "I2C") {
        rows.push(createPinRow(item, "I2C", pinDefaults.I2C.pins, pinDefaults.I2C.note));
        return;
      }

      if (interfaceName === "UART") {
        const uart = pinDefaults.UART.find((candidate) => !candidate.used);
        if (uart) {
          uart.used = true;
          rows.push(createPinRow(item, "UART", uart.pins, "TX/RX 交叉连接：主控 TX 接模块 RX，主控 RX 接模块 TX。"));
        } else {
          rows.push(createPinRow(item, "UART", "冲突：默认 UART 已占用", "需要改用软件串口、复用其他串口，或减少 UART 模块。"));
          notes.push(`${item.name} 需要 UART，但默认 UART 分配已满，建议检查串口资源。`);
        }
        return;
      }

      if (interfaceName === "SPI") {
        const csPin = pinDefaults.SPI.csPins[pinDefaults.SPI.csIndex];
        if (csPin) {
          pinDefaults.SPI.csIndex += 1;
          rows.push(createPinRow(item, "SPI", `${pinDefaults.SPI.bus}，${csPin}=CS`, "多个 SPI 模块可共用 SCK/MISO/MOSI，但每个模块必须分配独立 CS。"));
        } else {
          rows.push(createPinRow(item, "SPI", `${pinDefaults.SPI.bus}，CS 冲突`, "默认 CS 引脚不足，需要另选空闲 GPIO 作为 CS。"));
          notes.push(`${item.name} 需要 SPI 片选，但默认 CS 引脚不足，请额外分配空闲 GPIO。`);
        }
        return;
      }

      if (interfaceName === "ADC") {
        const pin = pinDefaults.ADC.shift();
        rows.push(createPinRow(item, "ADC", pin || "ADC 引脚不足", pin ? "模拟输入电压不能超过 3.3V。" : "需要减少 ADC 模块或调整引脚。"));
        if (!pin) notes.push(`${item.name} 需要 ADC，但默认 PA0/PA1/PA2 已分配完。`);
        return;
      }

      if (interfaceName === "PWM") {
        const pin = pinDefaults.PWM.shift();
        rows.push(createPinRow(item, "PWM", pin || "PWM 引脚不足", pin ? "用于舵机、电机调速、蜂鸣器或灯光亮度控制。" : "需要重新规划定时器 PWM 通道。"));
        if (!pin) notes.push(`${item.name} 需要 PWM，但默认 PA8/PB0/PB1 已分配完。`);
        return;
      }

      if (interfaceName === "GPIO") {
        const pin = pinDefaults.GPIO.shift();
        rows.push(createPinRow(item, "GPIO", pin || "GPIO 引脚不足", pin ? "普通输入输出建议加限流、上拉/下拉或驱动电路。" : "需要从其他空闲引脚重新分配。"));
        if (!pin) notes.push(`${item.name} 需要 GPIO，但默认 PB12-PB15 已分配完。`);
        return;
      }

      rows.push(createPinRow(item, interfaceName, "默认表未分配", `${interfaceName} 不在 STM32F103C8T6 默认接线规则中，建议使用 STM32CubeMX 或模块资料重新规划。`));
      notes.push(`${item.name} 使用 ${interfaceName}，默认引脚表未覆盖该接口，需要单独确认。`);
    });
  });

  if (rows.some((row) => row.pins.includes("冲突") || row.pins.includes("不足"))) {
    notes.push("存在引脚资源不足或冲突，建议重新选择模块接口模式，或使用 STM32CubeMX 重新规划引脚。");
  }

  return {
    title: "STM32F103C8T6 引脚连接建议",
    rows,
    notes: notes.length > 0 ? notes : ["默认引脚分配未发现明显冲突，实际接线前仍建议核对原理图、模块资料和启动引脚占用。"]
  };
}

function createPinRow(item, interfaceName, pins, note) {
  return {
    module: item.moduleLabel,
    device: item.name,
    interface: interfaceName,
    pins,
    note
  };
}

function getPreferredInterfaces(item) {
  if (hasInterface(item.interface, "None") || hasInterface(item.interface, "Flash") || hasInterface(item.interface, "RAM")) return [];
  const orderedInterfaces = ["I2C", "SPI", "UART", "ADC", "PWM", "GPIO", "CAN", "SDIO", "RGB", "USB", "Ethernet"];
  const preferred = orderedInterfaces.find((interfaceName) => hasInterface(item.interface, interfaceName));
  return preferred ? [preferred] : [];

  const text = item.interface;
  if (item.name === "无外部存储" || text === "None" || text === "Flash") return [];
  if (text.includes("I2C")) return ["I2C"];
  if (text.includes("SPI")) return ["SPI"];
  if (text.includes("UART")) return ["UART"];
  if (text.includes("ADC")) return ["ADC"];
  if (text.includes("PWM")) return ["PWM"];
  if (text.includes("GPIO")) return ["GPIO"];
  if (text.includes("CAN")) return ["CAN"];
  if (text.includes("SDIO")) return ["SDIO"];
  if (text.includes("RGB")) return ["RGB"];
  if (text.includes("USB")) return ["USB"];
  if (text.includes("Ethernet")) return ["Ethernet"];
  return [];
}

function needsInterface(item, interfaceName) {
  return getPreferredInterfaces(item).includes(interfaceName);
}

function createBomItem(category, item, required) {
  return {
    category,
    name: item.name,
    quantity: "1 个",
    interface: item.interface,
    voltage: item.voltage,
    keywords: getPurchaseKeywords(item),
    required,
    alternatives: getAlternatives(item),
    notes: item.notes
  };
}

function getPurchaseKeywords(item) {
  const suffixMap = {
    controller: "开发板 最小系统板",
    sensor: "传感器 模块",
    display: "显示模块 屏幕",
    communication: "通信模块",
    storage: "存储模块",
    actuator: "驱动 输出模块"
  };
  return `${item.name} ${suffixMap[item.moduleKey] || "模块"}`;
}

function getAlternatives(item) {
  const alternatives = {
    controller: "同系列 STM32 / ESP32 / RP2040 开发板",
    sensor: "同接口、同电压等级的同类传感器",
    display: "OLED、LCD、TFT 或串口屏",
    communication: "蓝牙、WiFi、RS485、LoRa 等同类通信模块",
    storage: "片内 Flash、EEPROM、SPI Flash、MicroSD",
    actuator: "LED、蜂鸣器、继电器、舵机、电机驱动模块"
  };
  return alternatives[item.moduleKey] || "同接口兼容模块";
}

function buildCompatibilitySummary(status, risks, warnings, passes) {
  if (status === "red") return "存在电平或供电等关键风险，不建议直接把所有模块接在一起制作。请先处理红色问题，再开始连线。";
  if (status === "yellow") return "硬件组合有可行性，但需要重点检查电源、电平和接口占用。建议先分模块验证。";
  return "未发现明显硬件冲突，仍建议制作前核对每个模块的数据手册和引脚定义。";
}

function buildRealisticAdvice(project) {
  const { controller, display, communication, actuator } = project.hardware;
  const controllerLevel = getControllerCapability(controller.name);
  const highComplexItems = getProjectHardwareItems(project).filter((item) => isHighComplexPart(item.name));
  const warnings = [];
  const risks = [];
  const passes = [];

  if (controllerLevel === "low" && highComplexItems.length > 0) {
    risks.push(`主控 ${controller.name} 资源或生态相对有限，但组合里出现 ${highComplexItems.map((item) => item.name).join("、")} 这类高复杂模块。建议替换为 STM32F401/STM32F407/ESP32-S3，或把模块降级为 OLED、蓝牙、W25Q64、SG90 等更容易实现的组合。`);
  }

  if (controllerLevel !== "high" && highComplexItems.some((item) => ["4G通信模块", "闭环电机控制", "高清IPS彩屏", "无刷电机驱动"].includes(item.name))) {
    warnings.push(`当前组合包含高复杂硬件，推荐搭配更强主控。替代建议：4G 项目优先用 ESP32-S3/STM32F407；闭环电机或无刷电机优先用 STM32F407/STM32H743；高清屏优先用 STM32H743 或带显示加速能力的平台。`);
  }

  if (project.strategyLabel === "真实可做优先模式") {
    if (controller.name === "STM32F103C8T6" && isEasyBuildSet(project)) {
      passes.push("该组合符合真实可做优先模式：STM32F103C8T6 搭配常见传感器、OLED/蓝牙/Flash 等模块，比较适合作为课程设计或入门开源项目。");
    }

    if (display.name === "高清IPS彩屏") {
      warnings.push("高清 IPS 彩屏对刷新率、显存和 SPI/RGB 带宽要求较高。替代建议：入门阶段可换成 0.96寸 OLED、1602 LCD 或普通 TFT 彩屏。");
    }

    if (communication.name === "4G通信模块") {
      warnings.push("4G 模块供电和协议调试难度较高。替代建议：先用 ESP8266 WiFi、ESP32 WiFi + BLE 或 WiFi云平台通信验证联网逻辑。");
    }

    if (["闭环电机控制", "无刷电机驱动"].includes(actuator.name)) {
      warnings.push("闭环/无刷电机涉及功率驱动、反馈和保护。替代建议：先用 SG90舵机、TB6612电机驱动或小马达做低风险版本。");
    }
  }

  return { warnings, risks, passes };
}

function getControllerCapability(controllerName) {
  if (["Arduino UNO", "Arduino Nano", "ATmega328P最小系统", "STC89C52", "STM8S103F3", "CH32V003", "ESP8266"].includes(controllerName)) return "low";
  if (["STM32F103C8T6", "GD32F103C8T6", "STM32G030F6P6", "STM32L031K6", "STM32F401CCU6", "STM32F411CEU6", "ESP32-WROOM", "ESP32-C3", "RP2040", "Raspberry Pi Pico W"].includes(controllerName)) return "medium";
  return "high";
}

function isHighComplexPart(name) {
  return ["4G通信模块", "NB-IoT通信模块", "PoE以太网模块", "闭环电机控制", "高清IPS彩屏", "无刷电机驱动", "大扭矩舵机", "直流减速电机带编码器", "智能舵机总线", "气泵/电磁阀控制", "STM32H743", "STM32F429IGT6", "STM32F767ZI", "Teensy 4.0", "电子墨水屏", "1.54寸电子墨水屏", "触摸屏", "2.8寸触摸TFT", "LoRa通信", "SD卡数据记录系统", "双MicroSD冗余记录", "eMMC存储模块", "QSPI Flash", "外部SRAM缓存模块", "云端数据同步", "MAX30102心率血氧", "CCS811空气质量传感器"].includes(name);
}

function isBeginnerFriendlyMode(modeKey) {
  return ["random", "environment", "motionSense", "desktopConsole", "dataLogger", "bluetoothRemote"].includes(modeKey);
}

function isEasyBuildSet(project) {
  const names = getProjectHardwareItems(project).map((item) => item.name);
  return names.some((name) => ["0.96寸 OLED", "1.3寸 OLED", "OLED + 按键", "1602 LCD", "I2C 1602 LCD"].includes(name))
    && names.some((name) => ["AHT20", "DHT11", "MPU6050", "光敏电阻", "NTC温度传感器", "DS18B20", "BMP280"].includes(name))
    && names.some((name) => ["HC-05蓝牙", "DX-BT24蓝牙", "蓝牙BLE串口模块", "W25Q64 SPI Flash", "AT24C02 EEPROM", "24C32 EEPROM", "参数保存在Flash"].includes(name));
}

function getStrategyLabel() {
  return selectedStrategy === "realistic" ? "真实可做优先模式" : "随机娱乐模式";
}

function renderProjectResult(project) {
  const { controller, sensor, display, communication, storage, actuator } = project.hardware;
  projectResult.innerHTML = `
    <h3>${project.name}</h3>
    <div class="summary-grid">
      <div class="summary-box"><span>项目方向</span><strong>${project.modeLabel}</strong></div>
      <div class="summary-box"><span>抽取策略</span><strong>${project.strategyLabel || "随机娱乐模式"}</strong></div>
      <div class="summary-box"><span>项目难度</span><strong>${project.difficulty}</strong></div>
      <div class="summary-box"><span>含金量评分</span><strong>${project.score}</strong></div>
    </div>
    <table class="result-table">
      <tbody>
        <tr><th>项目名称</th><td>${project.name}</td></tr>
        ${renderResultRow("主控核心", controller)}
        ${renderResultRow("感知模块", sensor)}
        ${renderResultRow("显示交互", display)}
        ${renderResultRow("通信模块", communication)}
        ${renderResultRow("存储模块", storage)}
        ${renderResultRow("执行器/输出模块", actuator)}
        ${renderExtraSlotRows(project)}
        <tr><th>项目简介</th><td>${project.description}</td></tr>
        <tr><th>推荐应用方向</th><td>${project.applications}</td></tr>
        <tr><th>后续扩展建议</th><td>${project.extensions}</td></tr>
      </tbody>
    </table>
    ${renderCompatibility(project.compatibility)}
    ${renderPinPlan(project.pinPlan)}
    ${renderRoadmap(project.roadmap)}
    ${renderBom(project.bom)}
  `;
}

function renderResultRow(label, item) {
  const config = rarityConfig[item.rarityKey];
  return `
    <tr>
      <th>${label}</th>
      <td>
        <span class="badge ${config.colorClass}">${item.rarityLabel} · ${item.rarityTitle}</span> ${item.name}
        <div class="hardware-meta">
          电压：${item.voltage} · 接口：${formatInterface(item.interface)} · 功耗：${item.powerLevel} · 难度：${item.difficulty}<br>
          注意：${item.notes}
        </div>
      </td>
    </tr>
  `;
}

function renderExtraSlotRows(project) {
  return getProjectSlots(project)
    .filter((slot) => slot.removable && slot.selectedPart)
    .map((slot) => renderResultRow(slot.label, slot.selectedPart))
    .join("");
}

function renderCompatibility(compatibility) {
  return `
    <section class="compatibility-panel compatibility-${compatibility.status}">
      <div class="compatibility-head">
        <span class="compatibility-dot"></span>
        <div>
          <h4>兼容性分析：${compatibility.title}</h4>
          <p>${compatibility.summary}</p>
        </div>
      </div>
      ${renderCompatibilityGroup("红色风险", compatibility.risks, "risk")}
      ${renderCompatibilityGroup("需要注意", compatibility.warnings, "warning")}
      ${renderCompatibilityGroup("基本可行", compatibility.passes, "pass")}
    </section>
  `;
}

function renderCompatibilityGroup(title, items, type) {
  if (items.length === 0) return "";
  return `
    <div class="compatibility-group ${type}">
      <strong>${title}</strong>
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderBom(bomItems) {
  return `
    <section class="bom-panel collapsible-panel">
      <button class="collapsible-trigger" type="button" aria-expanded="true">
        <span>BOM 清单</span>
        <span class="collapse-icon">收起</span>
      </button>
      <div class="collapsible-content">
        <div class="bom-head">
          <p>根据抽到的硬件组合自动生成，采购前请再次核对规格、封装和资料手册。</p>
        </div>
        <div class="bom-scroll">
          <table class="bom-table">
            <thead>
              <tr>
                <th>模块类别</th>
                <th>器件名称</th>
                <th>数量</th>
                <th>接口类型</th>
                <th>工作电压</th>
                <th>常见购买关键词</th>
                <th>是否必须</th>
                <th>可替代器件</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              ${bomItems.map(renderBomRow).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function renderRoadmap(roadmap) {
  return `
    <section class="roadmap-panel collapsible-panel">
      <button class="collapsible-trigger" type="button" aria-expanded="true">
        <span>项目开发路线图</span>
        <span class="collapse-icon">收起</span>
      </button>
      <div class="collapsible-content">
        <div class="roadmap-head">
          <p>按新手友好的顺序分阶段推进，每一步都有目标、测试方法和成功标准。</p>
        </div>
        <div class="roadmap-list">
          ${roadmap.map(renderRoadmapStage).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderRoadmapStage(stage, index) {
  return `
    <article class="roadmap-stage">
      <div class="roadmap-index">${index + 1}</div>
      <div>
        <h5>${stage.title}</h5>
        <p><strong>目标：</strong>${stage.target}</p>
        <p><strong>测试方法：</strong>${stage.test}</p>
        <p><strong>成功标准：</strong>${stage.success}</p>
      </div>
    </article>
  `;
}

function renderPinPlan(pinPlan) {
  if (!pinPlan) return "";
  return `
    <section class="pin-panel collapsible-panel">
      <button class="collapsible-trigger" type="button" aria-expanded="true">
        <span>${pinPlan.title}</span>
        <span class="collapse-icon">收起</span>
      </button>
      <div class="collapsible-content">
        <div class="pin-head">
          <p>根据抽到模块的接口自动生成，适合作为 STM32F103C8T6 最小系统/Blue Pill 的初始接线参考。</p>
        </div>
        <div class="pin-scroll">
          <table class="pin-table">
            <thead>
              <tr>
                <th>模块类别</th>
                <th>器件名称</th>
                <th>接口</th>
                <th>推荐 STM32 引脚</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              ${pinPlan.rows.map(renderPinRow).join("")}
            </tbody>
          </table>
        </div>
        <div class="pin-notes">
          <strong>提示</strong>
          <ul>
            ${pinPlan.notes.map((note) => `<li>${note}</li>`).join("")}
          </ul>
        </div>
      </div>
    </section>
  `;
}

function renderPinRow(row) {
  return `
    <tr>
      <td>${row.module}</td>
      <td>${row.device}</td>
      <td>${row.interface}</td>
      <td>${row.pins}</td>
      <td>${row.note}</td>
    </tr>
  `;
}

function renderBomRow(item) {
  return `
    <tr>
      <td>${item.category}</td>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${formatInterface(item.interface)}</td>
      <td>${item.voltage}</td>
      <td>${item.keywords}</td>
      <td>${item.required ? "是" : "否"}</td>
      <td>${item.alternatives}</td>
      <td>${item.notes}</td>
    </tr>
  `;
}

// Web Audio sound system. All sounds are generated locally; no external audio files are used.
function initAudio() {
  if (!soundEnabled || audioContext) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  audioContext = new AudioContextClass();
  resumeAudio();
}

function resumeAudio() {
  if (!soundEnabled || !audioContext) return;
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    initAudio();
    resumeAudio();
    playTone({ frequency: 760, duration: 0.05, gain: 0.035, type: "triangle" });
  } else {
    stopTickLoop();
  }
  updateSoundButton();
}

function updateSoundButton() {
  soundToggleBtn.textContent = soundEnabled ? "音效：开启" : "音效：关闭";
  soundToggleBtn.classList.toggle("sound-on", soundEnabled);
  soundToggleBtn.classList.toggle("sound-off", !soundEnabled);
}

function startTickLoop() {
  if (!soundEnabled) return;
  stopTickLoop();
  tickStartTime = performance.now();

  const tick = () => {
    if (!soundEnabled || !trackStates.some((state) => !state.stopped)) {
      stopTickLoop();
      return;
    }

    playTickSound();
    const elapsed = performance.now() - tickStartTime;
    tickTimer = window.setTimeout(tick, getTickInterval(elapsed));
  };

  tickTimer = window.setTimeout(tick, 70);
}

function stopTickLoop() {
  if (tickTimer) {
    window.clearTimeout(tickTimer);
    tickTimer = null;
  }
}

function getTickInterval(elapsedMs) {
  if (elapsedMs < 3000) return 68 + Math.random() * 18;
  if (elapsedMs < 5000) return 112 + Math.random() * 28;
  if (elapsedMs < 6500) return 195 + Math.random() * 44;
  return 280 + Math.random() * 70;
}

function playTickSound() {
  if (!soundEnabled) return;
  const frequency = randomInt(700, 1200);
  const duration = 0.03 + Math.random() * 0.03;
  playTone({
    frequency,
    duration,
    gain: 0.018,
    type: Math.random() > 0.55 ? "triangle" : "square",
    filterFrequency: 1500
  });
}

function playStopSound(rarity) {
  if (!soundEnabled) return;
  if (rarity === "gold") {
    playTone({ frequency: 520, duration: 0.09, gain: 0.05, type: "triangle", filterFrequency: 2200 });
    scheduleTone(92, { frequency: 760, duration: 0.11, gain: 0.055, type: "triangle", filterFrequency: 2600 });
    scheduleTone(184, { frequency: 1120, duration: 0.18, gain: 0.06, type: "sine", filterFrequency: 3400 });
    scheduleTone(245, { frequency: 1480, duration: 0.045, gain: 0.028, type: "square", filterFrequency: 4200 });
    return;
  }

  if (rarity === "pink") {
    playTone({ frequency: 620, duration: 0.075, gain: 0.04, type: "triangle", filterFrequency: 2300 });
    scheduleTone(82, { frequency: 880, duration: 0.105, gain: 0.045, type: "sine", filterFrequency: 2800 });
    return;
  }

  playTone({ frequency: 430, duration: 0.09, gain: 0.036, type: "triangle", filterFrequency: 1700 });
}

function playCompleteSound() {
  if (!soundEnabled) return;
  const notes = [520, 660, 780, 1040];
  notes.forEach((frequency, index) => {
    scheduleTone(index * 92, {
      frequency,
      duration: index === notes.length - 1 ? 0.22 : 0.105,
      gain: 0.045,
      type: "triangle",
      filterFrequency: 2800
    });
  });
}

function scheduleTone(delayMs, options) {
  if (!soundEnabled) return;
  window.setTimeout(() => playTone(options), delayMs);
}

function playTone({ frequency, duration, gain, type, filterFrequency = 1800 }) {
  if (!soundEnabled || !audioContext) return;
  resumeAudio();

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const filter = audioContext.createBiquadFilter();
  const envelope = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(filterFrequency, now);
  envelope.gain.setValueAtTime(0.0001, now);
  envelope.gain.exponentialRampToValueAtTime(gain, now + 0.008);
  envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(filter);
  filter.connect(envelope);
  envelope.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.03);
}

function buildMarkdown(project) {
  const { controller, sensor, display, communication, storage, actuator } = project.hardware;
  const extraRows = getProjectSlots(project)
    .filter((slot) => slot.removable && slot.selectedPart)
    .map((slot) => `| ${slot.label} | ${formatItemWithMeta(slot.selectedPart)} |`)
    .join("\n");
  return `# ${project.name}

## 项目表

| 项目 | 内容 |
| --- | --- |
| 项目方向 | ${project.modeLabel} |
| 抽取策略 | ${project.strategyLabel || "随机娱乐模式"} |
| 主控核心 | ${formatItemWithMeta(controller)} |
| 感知模块 | ${formatItemWithMeta(sensor)} |
| 显示交互 | ${formatItemWithMeta(display)} |
| 通信模块 | ${formatItemWithMeta(communication)} |
| 存储模块 | ${formatItemWithMeta(storage)} |
| 执行器/输出模块 | ${formatItemWithMeta(actuator)} |
${extraRows}
| 项目难度 | ${project.difficulty} |
| 含金量评分 | ${project.score} |
| 项目简介 | ${project.description} |
| 推荐应用方向 | ${project.applications} |
| 后续扩展建议 | ${project.extensions} |

${formatCompatibilityMarkdown(project.compatibility)}

${formatPinPlanMarkdown(project.pinPlan)}

${buildRoadmapMarkdown(project)}

${buildBomMarkdown(project)}

## 免责声明

本项目为学习和创意生成工具，硬件组合仅作为项目灵感参考，实际制作前需要检查电压、电流、接口、电平兼容性、封装、供应链和器件资料手册。`;
}

function buildBomMarkdown(project) {
  const rows = project.bom.map((item) => {
    return `| ${item.category} | ${item.name} | ${item.quantity} | ${formatInterface(item.interface)} | ${item.voltage} | ${item.keywords} | ${item.required ? "是" : "否"} | ${item.alternatives} | ${item.notes} |`;
  }).join("\n");

  return `## BOM 清单

| 模块类别 | 器件名称 | 数量 | 接口类型 | 工作电压 | 常见购买关键词 | 是否必须 | 可替代器件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rows}`;
}

function buildRoadmapMarkdown(project) {
  const stages = project.roadmap || generateRoadmap(project);
  return `## 项目开发路线图

${stages.map((stage, index) => `### ${index + 1}. ${stage.title}

- 目标：${stage.target}
- 测试方法：${stage.test}
- 成功标准：${stage.success}`).join("\n\n")}`;
}

function formatPinPlanMarkdown(pinPlan) {
  if (!pinPlan) {
    return `## STM32 引脚连接建议

本次主控不是 STM32F103C8T6，因此未生成 STM32F103C8T6 默认接线表。`;
  }

  const rows = pinPlan.rows.map((row) => {
    return `| ${row.module} | ${row.device} | ${row.interface} | ${row.pins} | ${row.note} |`;
  }).join("\n");

  return `## ${pinPlan.title}

| 模块类别 | 器件名称 | 接口 | 推荐 STM32 引脚 | 说明 |
| --- | --- | --- | --- | --- |
${rows}

### 接线提示

${pinPlan.notes.map((note) => `- ${note}`).join("\n")}`;
}

function buildCodexPrompt(project) {
  const { controller, sensor, display, communication, storage, actuator } = project.hardware;
  return `请基于以下硬件组合，为我设计一个真实可实现的 STM32/嵌入式项目方案。要求包括：功能规划、硬件连接建议、代码模块结构、README文档结构、测试步骤、后续扩展方向。

项目名称：${project.name}
项目方向：${project.modeLabel}
抽取策略：${project.strategyLabel || "随机娱乐模式"}
主控核心：${formatItem(controller)}
感知模块：${formatItem(sensor)}
显示交互：${formatItem(display)}
通信模块：${formatItem(communication)}
存储模块：${formatItem(storage)}
执行器/输出模块：${formatItem(actuator)}
项目难度：${project.difficulty}
含金量评分：${project.score}
兼容性结论：${project.compatibility.title}
兼容性说明：${project.compatibility.summary}
${project.pinPlan ? `STM32F103C8T6 引脚建议：\n${project.pinPlan.rows.map((row) => `- ${row.module} ${row.device}：${row.interface}，${row.pins}。${row.note}`).join("\n")}` : "STM32F103C8T6 引脚建议：本次主控不是 STM32F103C8T6，未自动生成。"}
开发路线图：
${(project.roadmap || generateRoadmap(project)).map((stage, index) => `${index + 1}. ${stage.title}：${stage.target}`).join("\n")}

项目简介：${project.description}

请输出：
1. 项目目标和核心功能
2. 硬件连接建议和电气兼容性注意事项
3. 固件代码模块结构
4. 关键驱动和业务逻辑实现思路
5. README.md 文档结构
6. 测试步骤
7. 后续扩展方向
8. 制作前需要核对的电压、电流、接口、电平兼容性、封装、供应链和资料手册清单`;
}

function buildFullReadme(project) {
  const { controller, sensor, display, communication, storage, actuator } = project.hardware;
  return `# ${project.name}

## 项目简介

${project.description}

本项目方向为 **${project.modeLabel}**，抽取策略为 **${project.strategyLabel || "随机娱乐模式"}**，项目难度评估为 **${project.difficulty}**，含金量评分为 **${project.score}/100**。

## 功能特点

${buildFeatureList(project).map((item) => `- ${item}`).join("\n")}

## 应用场景

${project.applications.split("、").map((item) => `- ${item}`).join("\n")}

## 硬件组成

| 模块类别 | 器件 | 稀有度 | 接口 | 工作电压 | 注意事项 |
| --- | --- | --- | --- | --- | --- |
| 主控核心 | ${controller.name} | ${controller.rarityLabel} · ${controller.rarityTitle} | ${formatInterface(controller.interface)} | ${controller.voltage} | ${controller.notes} |
| 感知模块 | ${sensor.name} | ${sensor.rarityLabel} · ${sensor.rarityTitle} | ${formatInterface(sensor.interface)} | ${sensor.voltage} | ${sensor.notes} |
| 显示交互 | ${display.name} | ${display.rarityLabel} · ${display.rarityTitle} | ${formatInterface(display.interface)} | ${display.voltage} | ${display.notes} |
| 通信模块 | ${communication.name} | ${communication.rarityLabel} · ${communication.rarityTitle} | ${formatInterface(communication.interface)} | ${communication.voltage} | ${communication.notes} |
| 存储模块 | ${storage.name} | ${storage.rarityLabel} · ${storage.rarityTitle} | ${formatInterface(storage.interface)} | ${storage.voltage} | ${storage.notes} |
| 执行器/输出模块 | ${actuator.name} | ${actuator.rarityLabel} · ${actuator.rarityTitle} | ${formatInterface(actuator.interface)} | ${actuator.voltage} | ${actuator.notes} |

${buildBomMarkdown(project)}

${formatPinPlanMarkdown(project.pinPlan)}

${formatCompatibilityMarkdown(project.compatibility)}

${buildRoadmapMarkdown(project)}

## 软件模块结构建议

\`\`\`text
${slugifyProjectName(project.name)}/
├── README.md
├── docs/
│   ├── wiring.md
│   └── test-plan.md
├── firmware/
│   ├── Core/
│   │   ├── Inc/
│   │   └── Src/
│   ├── Drivers/
│   └── Middlewares/
└── tools/
    └── log_parser.py
\`\`\`

- \`app_main\`：项目主状态机和任务调度。
- \`bsp_${safeModuleName(controller.name)}\`：主控板级初始化、时钟、GPIO 和外设配置。
- \`drv_sensor\`：${sensor.name} 数据采集驱动。
- \`drv_display\`：${display.name} 显示或交互驱动。
- \`drv_comm\`：${communication.name} 通信协议和数据收发。
- \`drv_storage\`：${storage.name} 参数、日志或历史数据保存。
- \`drv_output\`：${actuator.name} 输出控制、保护和状态反馈。

## 使用方法

1. 按照“硬件组成”和“接线建议”准备模块。
2. 核对所有模块的工作电压、接口电平和供电能力。
3. 先单独跑通主控点灯和串口日志。
4. 依次接入 ${sensor.name}、${display.name}、${communication.name}、${storage.name} 和 ${actuator.name}。
5. 在固件中启用对应驱动模块，并通过串口输出关键调试信息。
6. 完成整体联调后，再整理外壳、供电和长期运行测试。

## 测试步骤

1. 电源测试：空载测量 3.3V/5V 电源是否稳定。
2. 主控测试：下载最小固件，确认串口日志和 LED 状态正常。
3. 传感器测试：读取 ${sensor.name} 原始数据，确认数值变化合理。
4. 显示交互测试：确认 ${display.name} 能显示状态或响应输入。
5. 通信测试：确认 ${communication.name} 能发送/接收测试数据。
6. 存储测试：确认 ${storage.name} 能写入、读取和异常恢复。
7. 输出测试：确认 ${actuator.name} 不会让主控复位或电源跌落。
8. 集成测试：连续运行 30 分钟以上，观察功耗、温升、数据稳定性和异常恢复。

## 后续扩展方向

${project.extensions.split("。").filter(Boolean).map((item) => `- ${item}。`).join("\n")}

## 注意事项

- 实际接线前必须核对每个模块的数据手册、引脚定义和供电要求。
- 3.3V 主控连接 5V 模块时，不要默认可以直连，优先检查电平兼容性。
- 电机、舵机、继电器、灯带、4G 模块等高功耗器件建议独立供电并与主控共地。
- I2C 设备可以共用总线，但地址不能冲突。
- SPI 设备可以共用 SCK/MISO/MOSI，但每个设备需要独立 CS。
- 初次制作建议分模块验证，不要一次性接上全部硬件。

## 免责声明

本 README 由 MCU LootBox 根据随机硬件组合自动生成，仅作为学习和项目灵感参考。实际制作前需要检查电压、电流、接口、电平兼容性、封装、供应链和器件资料手册。因硬件版本差异、模块商家设计差异或接线错误造成的问题，需要制作者自行核对和承担。`;
}

function buildFeatureList(project) {
  const { sensor, display, communication, storage, actuator } = project.hardware;
  const features = [
    `使用 ${sensor.name} 采集关键数据。`,
    `通过 ${display.name} 展示状态或进行交互。`,
    `通过 ${communication.name} 实现调试、联网或远程控制。`,
    `使用 ${actuator.name} 实现提醒、驱动或执行动作。`
  ];

  if (storage.name !== "无外部存储") {
    features.push(`使用 ${storage.name} 保存参数、日志或历史数据。`);
  } else {
    features.push("保持轻量化设计，不依赖外部存储模块。");
  }

  return features;
}

function slugifyProjectName(name) {
  return name.replace(/\s+/g, "-").replace(/[^\w\u4e00-\u9fa5-]/g, "").toLowerCase();
}

function safeModuleName(name) {
  return name.replace(/[^\w]/g, "_").toLowerCase();
}

function formatItem(item) {
  return `${item.name}（${item.rarityLabel} · ${item.rarityTitle}）`;
}

function formatItemWithMeta(item) {
  return `${formatItem(item)}；电压：${item.voltage}；接口：${formatInterface(item.interface)}；功耗：${item.powerLevel}；难度：${item.difficulty}；注意：${item.notes}`;
}

function formatCompatibilityMarkdown(compatibility) {
  const lines = [
    `## 兼容性分析`,
    ``,
    `结论：${compatibility.title}`,
    ``,
    compatibility.summary,
    ``
  ];

  if (compatibility.risks.length > 0) {
    lines.push(`### 红色风险`, ...compatibility.risks.map((item) => `- ${item}`), ``);
  }
  if (compatibility.warnings.length > 0) {
    lines.push(`### 需要注意`, ...compatibility.warnings.map((item) => `- ${item}`), ``);
  }
  if (compatibility.passes.length > 0) {
    lines.push(`### 基本可行`, ...compatibility.passes.map((item) => `- ${item}`), ``);
  }

  return lines.join("\n");
}

function meta(voltage, interfaceType, powerLevel, difficulty, notes) {
  return { voltage, interface: interfaceType, powerLevel, difficulty, notes };
}

function is3v3Controller(controller) {
  return controller.voltage === "3.3V";
}

function is5vController(controller) {
  return controller.voltage === "5V";
}

function isStrict5V(voltage) {
  return voltage === "5V";
}

function usesLogicInterface(interfaceText) {
  return ["GPIO", "ADC", "I2C", "SPI", "UART", "PWM", "CAN"].some((name) => hasInterface(interfaceText, name));
}

function needsLevelShifter(controller, hardwareItems) {
  if (is3v3Controller(controller)) {
    return hardwareItems.some((item) => item !== controller && isStrict5V(item.voltage) && usesLogicInterface(item.interface));
  }
  if (is5vController(controller)) {
    return hardwareItems.some((item) => item !== controller && item.voltage === "3.3V" && usesLogicInterface(item.interface));
  }
  return false;
}

function needsExtraPower(project) {
  const highPowerItems = getProjectHardwareItems(project).filter((item) => item.powerLevel === "high");
  return highPowerItems.length > 0 || project.hardware.communication.name === "4G通信模块";
}

function countInterfaces(items) {
  const names = ["I2C", "SPI", "UART", "PWM", "CAN", "ADC"];
  return names.reduce((counts, name) => {
    counts[name] = items.filter((item) => hasInterface(item.interface, name)).length;
    return counts;
  }, {});
}

function buildInterfaceNotes(counts) {
  const warnings = [];
  const passes = [];

  if (counts.I2C >= 3) {
    warnings.push(`I2C 设备数量较多（${counts.I2C} 个），需要确认地址是否冲突，并把上拉电阻接到正确电压。`);
  } else if (counts.I2C > 0) {
    passes.push("I2C 设备数量不多，通常可以共用 SDA/SCL，但仍要检查地址。");
  }

  if (counts.SPI >= 3) {
    warnings.push(`SPI 设备较多（${counts.SPI} 个），需要为每个 SPI 模块分配独立 CS 片选，并注意总线速度。`);
  } else if (counts.SPI > 0) {
    passes.push("SPI 设备数量可控，注意片选线分配即可。");
  }

  if (counts.UART >= 3) {
    warnings.push(`UART 设备较多（${counts.UART} 个），主控串口数量可能不够，需要软件串口、复用或更换主控。`);
  } else if (counts.UART > 0) {
    passes.push("UART 使用数量不高，通常便于调试和接线。");
  }

  if (counts.CAN > 0) {
    warnings.push("包含 CAN 接口时，需要确认主控是否有 CAN 外设、是否需要收发器以及总线终端电阻。");
  }

  return { warnings, passes };
}

function findUnsupportedInterfaces(controller, hardwareItems) {
  const checkedInterfaces = ["I2C", "SPI", "UART", "PWM", "CAN", "ADC", "SDIO", "RGB", "USB", "Ethernet"];
  const missing = new Set();

  hardwareItems.forEach((item) => {
    if (item === controller) return;
    checkedInterfaces.forEach((interfaceName) => {
      if (hasInterface(item.interface, interfaceName) && !hasInterface(controller.interface, interfaceName)) {
        missing.add(`${item.name} 需要 ${interfaceName}`);
      }
    });
  });

  return Array.from(missing);
}

function getTrackElement(moduleKey) {
  return tracksContainer.querySelector(`[data-module-key="${moduleKey}"]`);
}

function pickRarity() {
  const roll = Math.random();
  if (roll < rarityConfig.blue.chance) return "blue";
  if (roll < rarityConfig.blue.chance + rarityConfig.pink.chance) return "pink";
  return "gold";
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function pickWeightedHardware(module, rarityKey, modeKey, context = {}) {
  const items = module.pool[rarityKey];
  const mode = projectModes[modeKey] || projectModes.random;
  const categoryKey = module.categoryKey || module.key;
  const preferredItems = mode.weights[categoryKey] || [];
  const weighted = [];

  items.forEach((item) => {
    const itemName = getHardwareName(item);
    const isPreferred = preferredItems.includes(itemName);
    let weight = isPreferred ? 5 : 1;
    weight *= getRealisticWeight(categoryKey, itemName, context, modeKey);
    const ticketCount = Math.max(1, Math.round(weight));
    for (let index = 0; index < ticketCount; index += 1) {
      weighted.push(item);
    }
  });

  return pick(weighted);
}

function getRealisticWeight(moduleKey, itemName, context, modeKey) {
  if (selectedStrategy !== "realistic") return 1;

  const itemMeta = hardwareMeta[itemName] || meta("未知", "Unknown", "medium", "medium", "");
  const controller = context.controller;
  const controllerLevel = controller ? getControllerCapability(controller.name) : "medium";
  let weight = 1;

  if (moduleKey === "controller") {
    if (modeKey === "iotMonitor") {
      if (["ESP8266", "ESP32-WROOM", "ESP32-S3", "Raspberry Pi Pico W"].includes(itemName)) weight *= 4;
    } else if (modeKey === "robotCar") {
      if (["STM32F103C8T6", "STM32F401CCU6", "STM32F407VET6", "ESP32-WROOM"].includes(itemName)) weight *= 4;
    } else {
      if (["STM32F103C8T6", "STM32F401CCU6", "STM32F411CEU6", "ESP32-WROOM", "RP2040"].includes(itemName)) weight *= 4;
      if (["Arduino UNO", "STC89C52"].includes(itemName)) weight *= 0.45;
    }
    return weight;
  }

  if (controllerLevel === "low") {
    if (itemMeta.powerLevel === "high") weight *= 0.2;
    if (itemMeta.difficulty === "hard") weight *= 0.18;
    if (isHighComplexPart(itemName)) weight *= 0.12;
  }

  if (controllerLevel === "medium") {
    if (itemMeta.powerLevel === "high") weight *= 0.55;
    if (itemMeta.difficulty === "hard") weight *= 0.5;
    if (isHighComplexPart(itemName)) weight *= 0.45;
  }

  if (controllerLevel === "high") {
    if (isHighComplexPart(itemName)) weight *= 3.8;
    if (itemMeta.difficulty === "hard") weight *= 1.7;
  }

  if (isBeginnerFriendlyMode(modeKey)) {
      if (["0.96寸 OLED", "1.3寸 OLED", "OLED + 按键", "AHT20", "DHT11", "DS18B20", "BMP280", "MPU6050", "W25Q64 SPI Flash", "24C32 EEPROM", "DX-BT24蓝牙", "HC-05蓝牙", "蓝牙BLE串口模块"].includes(itemName)) {
      weight *= 3.5;
    }
    if (itemMeta.powerLevel === "high" || itemMeta.difficulty === "hard") {
      weight *= 0.25;
    }
  }

  if (controller && controller.name === "STM32F103C8T6") {
    if (["0.96寸 OLED", "1.3寸 OLED", "OLED + 按键", "AHT20", "DHT11", "DS18B20", "BMP280", "MPU6050", "W25Q64 SPI Flash", "W25Q128 SPI Flash", "DX-BT24蓝牙", "HC-05蓝牙", "蓝牙BLE串口模块", "SG90舵机", "DRV8833电机驱动"].includes(itemName)) {
      weight *= 2.8;
    }
  }

  return weight;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function easeOutQuint(t) {
  return 1 - Math.pow(1 - t, 5);
}

function countRarities(items) {
  return items.reduce((counts, item) => {
    counts[item.rarityKey] += 1;
    return counts;
  }, { blue: 0, pink: 0, gold: 0 });
}

function getControllerFamily(controller) {
  if (controller.startsWith("STM32")) return "STM32";
  if (controller.startsWith("ESP")) return "ESP";
  if (controller.includes("Pico")) return "Pico W";
  return controller;
}

function isOneOf(value, items) {
  return items.includes(value);
}

function hasBluetooth(value) {
  return value.includes("蓝牙") || value.includes("BLE");
}

function hasCloudOrWifi(value) {
  return value.includes("WiFi") || value.includes("云平台") || value.includes("以太网") || value.includes("4G");
}

function hasDisplay(value) {
  return ["OLED", "LCD", "数码管", "点阵", "屏", "电子墨水"].some((keyword) => value.includes(keyword));
}

function hasMotion(value) {
  return ["舵机", "电机", "马达", "驱动"].some((keyword) => value.includes(keyword));
}

function describeSensor(sensor) {
  if (sensor.includes("姿态") || sensor === "MPU6050" || sensor.includes("倾斜") || sensor.includes("磁编码器")) return "采集姿态、角度或震动数据";
  if (sensor.includes("气体")) return "检测空气或气体异常";
  if (sensor.includes("空气质量")) return "检测空气质量和 VOC 变化";
  if (sensor.includes("测距")) return "采集距离数据";
  if (sensor.includes("电流")) return "采集电压、电流或功耗数据";
  if (sensor.includes("颜色")) return "识别颜色和光照变化";
  if (sensor.includes("手势")) return "采集手势、接近或非接触交互数据";
  if (sensor.includes("心率")) return "采集红光/红外生理信号";
  if (sensor.includes("温度") || sensor.includes("测温") || ["AHT20", "DHT11", "BME280", "BMP280", "SHT31", "DS18B20"].includes(sensor)) return "采集环境温湿度、气压或温度数据";
  if (sensor.includes("光敏")) return "采集环境光照强度";
  return "采集关键环境或交互数据";
}

async function copyText(text, successMessage) {
  try {
    if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
    await navigator.clipboard.writeText(text);
    showToast(successMessage);
  } catch (error) {
    fallbackCopy(text);
    showToast("已生成文本；如果未自动复制，请在文本框中手动复制。");
  }
}

function fallbackCopy(text) {
  promptBoxLabel.textContent = "可复制文本";
  promptText.value = text;
  promptBox.classList.remove("hidden");
  promptText.focus();
  promptText.select();
  document.execCommand("copy");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}
