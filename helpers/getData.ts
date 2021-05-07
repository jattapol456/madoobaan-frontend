import PROVINCES from "./db/Thailand-Address/provinces.json"
import DISTRICTS from "./db/Thailand-Address/districts.json"
import SUBDISTRICTS from "./db/Thailand-Address/subdistricts.json"
// import ZONES from "./db/Thailand-Address/zones.json"

export const getProvinces = () => {
  return PROVINCES.filter(p => p.GEO_ID === 1)
}

export const getDistricts = (province_id) => {
  return DISTRICTS.filter(d => d.PROVINCE_ID === province_id)
}

export const getsubDistricts = (district_id) => {
  return SUBDISTRICTS.filter(s => s.DISTRICT_ID === district_id)
}

export const getsubDistrictsname = (sub_district_name) => {
  return SUBDISTRICTS.filter(r => r.SUB_DISTRICT_NAME === sub_district_name)
}

