import { defineStore } from 'pinia'

export const useLocationStore = defineStore('location', {
  state: () => ({
    position: {latitude: 0, longitude: 0}
  }),
  actions: {
    getLocation() {
      let success = (position: GeolocationPosition) => {
          // const latitude = position.coords.latitude;
          // const longitude = position.coords.longitude;
          this.position.latitude = position.coords.latitude;
          this.position.longitude = position.coords.longitude;
      };

      let error = () => {
        this.position = {latitude: 0, longitude: 0}
      };

      navigator.geolocation.getCurrentPosition(success, error);
    },
    getMapLink() {
      this.getLocation();
      return `https://www.openstreetmap.org/#map=18/${this.position.latitude}/${this.position.longitude}`;
    },
    getMessage() {
      return `Latitude: ${this.position.latitude} °, Longitude: ${this.position.longitude} °`;
    }
  }
})