import geodb from '../db/geodb.json'

type Tree = Array<string | number | Array<Tree>>

export interface IAddress {
  id: number
  subDistrict: string
  district: string
  province: string
  subDistrictCode: number | null
  districtCode: number | null
  provinceCode: number | null
  zipcode: string | null
}

interface IGeolocationCoordinates {
  accuracy: number
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number
  longitude: number
  speed: number | null
}

interface IGeolocationPosition {
  coords: IGeolocationCoordinates
  timestamp: number
}

export interface ILocation {
  latitude: number
  longitude: number
}

export default class GeoHelpers {
  static lookup: string[]
  static words: string[]
  static expanded: IAddress[] = []

  static initDB() {
    if (this.expanded.length) return this.expanded
    const data = geodb.data as Tree[]
    this.lookup = geodb.lookup.split('|')
    this.words = geodb.words.split('|')
    let i = 1

    data.forEach((province) => {
      ;(province[2] as Array<Tree>).forEach((amphoe) => {
        ;(amphoe[2] as Array<Tree>).forEach((district) => {
          const districts = district as Array<Tree>
          districts[2] = Array.isArray(districts[2])
            ? districts[2]
            : [districts[2]]
          ;(districts[2] as Array<number>).forEach((zipcode) => {
            const item = {
              id: i++,
              subDistrict: this.t(district[0] as string | number) || '',
              district: this.t(amphoe[0] as string | number) || '',
              province: this.t(province[0] as string | number) || '',
              subDistrictCode: (district[1] as number) || null,
              districtCode: (amphoe[1] as number) || null,
              provinceCode: (province[1] as number) || null,
              zipcode: zipcode?.toString() || null,
            }

            this.expanded.push(item)
          })
        })
      })
    })

    return this.expanded
  }

  static t(text: string | number): string {
    if (typeof text === 'number') text = this.lookup[text]
    return (text as string).replace(/[A-Z]/gi, (m: string) => {
      const ch = m.charCodeAt(0)

      return this.words[ch < 97 ? ch - 65 : 26 + ch - 97]
    })
  }

  static getLocation(): Promise<IGeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (res) => {
            resolve(res)
          },
          (err) => {
            reject(err)
          },
          { timeout: 15000 }
        )
      } else
        reject(
          new Error(
            'Geolocation is not supported by this browser or disabled by user.'
          )
        )
    })
  }
}
