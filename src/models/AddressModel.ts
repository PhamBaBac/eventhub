interface AddressModel {
  address: Address;
  distance: number;
  houseNumberType: string;
  id: string;
  mapView: MapView;
  position: Position;
}
interface Position {
  lat: number;
  lng: number;
}
interface MapView {
  east: number;
  north: number;
  south: number;
  west: number;
}
interface Address {
  city: string;
  countryCode: string;
  countryName: string;
  county: string;
  district: string;
  houseNumber: string;
  label: string;
  postalCode: string;
  state: string;
  stateCode: string;
  street: string;
}
