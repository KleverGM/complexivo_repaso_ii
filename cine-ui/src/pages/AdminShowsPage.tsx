import { useEffect, useState } from "react";
import {
  Container, Paper, Typography, TextField, Button, Stack,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { type Show, listShowsApi, createShowApi, updateShowApi, deleteShowApi } from "../api/shows.api";

export default function AdminShowsPage() {
  const [items, setItems] = useState<Show[]>([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [room, setRoom] = useState("");
  const [price, setPrice] = useState (0)
  const [availableSeats, setAvailableSeats] = useState (0)
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const data = await listShowsApi();
      setItems(data.results); // DRF paginado
    } catch {
      setError("No se pudo cargar shows. ¿Login? ¿Token admin?");
    }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    try {
      setError("");
      if (!movieTitle.trim()) return setError("MovieTitle requerido");
      if (price <= 0 || availableSeats <= 0) {return setError("Precio y asientos deben ser mayores a 0");}

      const payload = {
        movie_title: movieTitle.trim(),
        room: room.trim(),
        price: Number(price),
        available_seats: Number(availableSeats),
      };

      if (editId) await updateShowApi(editId, payload);
      else await createShowApi(payload);

      setMovieTitle("");
      setRoom("");
      setPrice(0);
      setAvailableSeats(0);
      setEditId(null);
      await load();
    } catch {
      setError("No se pudo guardar marca. ¿Token admin?");
    }
  };

  const startEdit = (s: Show) => {
    setEditId(s.id);
    setMovieTitle(s.movie_title);
    setRoom(s.room);
    setPrice(s.price);
    setAvailableSeats(s.available_seats);
  };

  const remove = async (id: number) => {
    try {
      setError("");
      await deleteShowApi(id);
      await load();
    } catch {
      setError("No se pudo eliminar marca. ¿Vehículos asociados? ¿Token admin?");
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Admin Shows (Privado)</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
            label="Título de la Película"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            fullWidth
            />
            <TextField
              label="Sala"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              sx={{ width: 200 }}
              placeholder="Ej: Sala 1, VIP-A"
            />
        </Stack>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>MovieTitle</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.movie_title}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => startEdit(s)}><EditIcon /></IconButton>
                  <IconButton onClick={() => remove(s.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}