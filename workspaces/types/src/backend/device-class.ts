export namespace DeviceClass {
  // Generic sensor. This is the default and doesn’t need to be set.
  export type None = "None";

  // Apparent power in VA.
  export type ApparentPower = "apparent_power";

  // Air Quality Index (unitless).
  export type AQI = "aqi";

  // Atmospheric pressure in cbar, bar, hPa, inHg, kPa, mbar, Pa or psi
  export type AtmosphericPressure = "atmospheric_pressure";

  // Percentage of battery that is left in %
  export type Battery = "battery";

  // Carbon Dioxide in CO2 (Smoke) in ppm
  export type CarbonDioxide = "carbon_dioxide";

  // Carbon Monoxide in CO (Gas CNG/LPG) in ppm
  export type CarbonMonoxide = "carbon_monoxide";

  // Current in A, mA
  export type Current = "current";

  // Data rate in bit/s, kbit/s, Mbit/s, Gbit/s, B/s, kB/s, MB/s, GB/s, KiB/s, MiB/s or GiB/s
  export type DataRate = "data_rate";

  // Data size in bit, kbit, Mbit, Gbit, B, kB, MB, GB, TB, PB, EB, ZB, YB, KiB, MiB, GiB, TiB, PiB, EiB, ZiB or YiB
  export type DataSize = "data_size";

  // Date string (ISO 8601)
  export type Date = "date";

  // Generic distance in km, m, cm, mm, mi, yd, or in
  export type Distance = "distance";

  // Duration in d, h, min, or s
  export type Duration = "duration";

  // Energy in Wh, kWh, MWh, MJ, or GJ
  export type Energy = "energy";

  // Stored energy in Wh, kWh, MWh, MJ, or GJ
  export type EnergyStorage = "energy_storage";

  // Has a limited set of (non-numeric) states
  export type Enum = "enum";

  // Frequency in Hz, kHz, MHz, or GHz
  export type Frequency = "frequency";

  // Gas volume in m³, ft³ or CCF
  export type Gas = "gas";

  // Percentage of humidity in the air in %
  export type Humidity = "humidity";

  // The current light level in lx
  export type Illuminance = "illuminance";

  // Irradiance in W/m² or BTU/(h⋅ft²)
  export type Irradiance = "irradiance";

  // Percentage of water in a substance in %
  export type Moisture = "moisture";

  // The monetary value (ISO 4217)
  export type Monetary = "monetary";

  // Concentration of Nitrogen Dioxide in µg/m³
  export type NitrogenDioxide = "nitrogen_dioxide";

  // Concentration of Nitrogen Monoxide in µg/m³
  export type NitrogenMonoxide = "nitrogen_monoxide";

  // Concentration of Nitrous Oxide in µg/m³
  export type NitrousOxide = "nitrous_oxide";

  // Concentration of Ozone in µg/m³
  export type Ozone = "ozone";

  // Potential hydrogen (pH) value of a water solution
  export type PH = "ph";

  // Concentration of particulate matter less than 1 micrometer in µg/m³
  export type PM1 = "pm1";

  // Concentration of particulate matter less than 2.5 micrometers in µg/m³
  export type PM25 = "pm25";

  // Concentration of particulate matter less than 10 micrometers in µg/m³
  export type PM10 = "pm10";

  // Power factor (unitless), unit may be None or %
  export type PowerFactor = "power_factor";

  // Power in W or kW
  export type Power = "power";

  // Accumulated precipitation in cm, in or mm
  export type Precipitation = "precipitation";

  // Precipitation intensity in in/d, in/h, mm/d or mm/h
  export type PrecipitationIntensity = "precipitation_intensity";

  // Pressure in Pa, kPa, hPa, bar, cbar, mbar, mmHg, inHg or psi
  export type Pressure = "pressure";

  // Reactive power in var
  export type ReactivePower = "reactive_power";

  // Signal strength in dB or dBm
  export type SignalStrength = "signal_strength";

  // Sound pressure in dB or dBA
  export type SoundPressure = "sound_pressure";

  // Generic speed in ft/s, in/d, in/h, km/h, kn, m/s, mph or mm/d
  export type Speed = "speed";

  // Concentration of sulphur dioxide in µg/m³
  export type SulphurDioxide = "sulphur_dioxide";

  // Temperature in °C, °F or K
  export type Temperature = "temperature";

  // Datetime object or timestamp string (ISO 8601)
  export type Timestamp = "timestamp";

  // Concentration of volatile organic compounds in µg/m³
  export type VolatileOrganicCompounds = "volatile_organic_compounds";

  // Ratio of volatile organic compounds in ppm or ppb
  export type VolatileOrganicCompoundsParts =
    "volatile_organic_compounds_parts";

  // Voltage in V, mV
  export type Voltage = "voltage";

  // Generic volume in L, mL, gal, fl. oz., m³, ft³, or CCF
  export type Volume = "volume";

  // Generic stored volume in L, mL, gal, fl. oz., m³, ft³, or CCF
  export type VolumeStorage = "volume_storage";

  // Water consumption in L, gal, m³, ft³, or CCF
  export type Water = "water";

  // Generic mass in kg, g, mg, µg, oz, lb, or st
  export type Weight = "weight";

  // Wind speed in ft/s, km/h, kn, m/s, or mph
  export type WindSpeed = "wind_speed";
}

export type DeviceClass =
  | DeviceClass.None
  | DeviceClass.ApparentPower
  | DeviceClass.AQI
  | DeviceClass.AtmosphericPressure
  | DeviceClass.Battery
  | DeviceClass.CarbonDioxide
  | DeviceClass.CarbonMonoxide
  | DeviceClass.Current
  | DeviceClass.DataRate
  | DeviceClass.DataSize
  | DeviceClass.Date
  | DeviceClass.Distance
  | DeviceClass.Duration
  | DeviceClass.Energy
  | DeviceClass.EnergyStorage
  | DeviceClass.Enum
  | DeviceClass.Frequency
  | DeviceClass.Gas
  | DeviceClass.Humidity
  | DeviceClass.Illuminance
  | DeviceClass.Irradiance
  | DeviceClass.Moisture
  | DeviceClass.Monetary
  | DeviceClass.NitrogenDioxide
  | DeviceClass.NitrogenMonoxide
  | DeviceClass.NitrousOxide
  | DeviceClass.Ozone
  | DeviceClass.PH
  | DeviceClass.PM1
  | DeviceClass.PM25
  | DeviceClass.PM10
  | DeviceClass.PowerFactor
  | DeviceClass.Power
  | DeviceClass.Precipitation
  | DeviceClass.PrecipitationIntensity
  | DeviceClass.Pressure
  | DeviceClass.ReactivePower
  | DeviceClass.SignalStrength
  | DeviceClass.SoundPressure
  | DeviceClass.Speed
  | DeviceClass.SulphurDioxide
  | DeviceClass.Temperature
  | DeviceClass.Timestamp
  | DeviceClass.VolatileOrganicCompounds
  | DeviceClass.VolatileOrganicCompoundsParts
  | DeviceClass.Voltage
  | DeviceClass.Volume
  | DeviceClass.VolumeStorage
  | DeviceClass.Water
  | DeviceClass.Weight
  | DeviceClass.WindSpeed;
