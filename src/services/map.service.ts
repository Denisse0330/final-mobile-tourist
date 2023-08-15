import axios from "axios";

export class MapService {
  private _apiUrl: string;

  constructor(
    private latitude: number,
    private longitude: number,
    private api_key: string
  ) {
    this._apiUrl = `https://google-maps-cors-production.up.railway.app/nearbySearch`;
  }

  getPlaces = async (next_page?: string) => {
    const response = await axios.get(this._apiUrl, {
      headers: {
        "x-requested-with": "XMLHttpRequest",
      },
      params: {
        pagetoken: next_page,
        location: `${this.latitude},${this.longitude}`,
        key: `${this.api_key}`,
        type: "restaurant,cafe,museum,bar,park,store,gym,school,hospital,library,airport,lodging,amusement_park,zoo,movie_theater,beach",
        radius: 2000,
      },
    });

    return response;
  };
}
