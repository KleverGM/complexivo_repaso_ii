import { http } from "./http";
    
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Reservation = {
  show_movie_title: string;
  id: number;
  show: number;
  customer_name: string;
  seats: number;
  status: string;
  created_at: string;
};

export async function listReservationsPublicApi() {
  const { data } = await http.get<Paginated<Reservation>>("/api/reservations/");
  return data; // { ... , results: [] }
}

export async function listReservationsAdminApi() {
  const { data } = await http.get<Paginated<Reservation>>("/api/reservations/");
  return data;
}

export async function createReservationApi(payload: Omit<Reservation, "id">) {
  const { data } = await http.post<Reservation>("/api/reservations/", payload);
  return data;
}

export async function updateReservationApi(id: number, payload: Partial<Reservation>) {
  const { data } = await http.put<Reservation>(`/api/reservations/${id}/`, payload);
  return data;
}

export async function deleteReservationApi(id: number) {
  await http.delete(`/api/reservations/${id}/`);
}