import React, { useMemo, useState } from "react";

// --- Mock data for UI demo (replace with Firebase later) ---
const mockFlights = [
  { id: "VN123", type: "flight", totalSeats: 40, availableSeats: 12 },
  { id: "VN456", type: "flight", totalSeats: 32, availableSeats: 6 },
];

const mockBuses = [
  { id: "29B-12345", type: "bus", totalSeats: 40, availableSeats: 5 },
  { id: "51B-67890", type: "bus", totalSeats: 28, availableSeats: 9 },
];

export default function App() {
  const [userEmail, setUserEmail] = useState("");
  const [flightId, setFlightId] = useState("");
  const [busId, setBusId] = useState("");
  const [seats, setSeats] = useState(1);

  // Local state to simulate seat changes (demo only)
  const [flights, setFlights] = useState(mockFlights);
  const [buses, setBuses] = useState(mockBuses);

  const selectedFlight = useMemo(
    () => flights.find((f) => f.id === flightId),
    [flights, flightId]
  );
  const selectedBus = useMemo(
    () => buses.find((b) => b.id === busId),
    [buses, busId]
  );

  function handleMockBook() {
    if (!userEmail) return alert("Nhập email!");
    if (!flightId && !busId)
      return alert("Chọn ít nhất 1 chuyến bay hoặc 1 xe bus!");

    if (flightId) {
      const idx = flights.findIndex((f) => f.id === flightId);
      if (idx > -1) {
        const f = flights[idx];
        if (f.availableSeats < seats) return alert("Chuyến bay không đủ ghế!");
        const next = [...flights];
        next[idx] = { ...f, availableSeats: f.availableSeats - seats };
        setFlights(next);
      }
    }

    if (busId) {
      const idx = buses.findIndex((b) => b.id === busId);
      if (idx > -1) {
        const b = buses[idx];
        if (b.availableSeats < seats) return alert("Xe bus không đủ ghế!");
        const next = [...buses];
        next[idx] = { ...b, availableSeats: b.availableSeats - seats };
        setBuses(next);
      }
    }

    alert("(Demo) Đặt thành công – dữ liệu chỉ thay đổi trên giao diện.");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold">Đăng ký Chuyến bay & Xe buýt</h1>
          <p className="text-sm text-gray-500">
            Bản demo UI dành cho GitHub Pages. Sau này sẽ nối Firebase Realtime
            Database/Firestore.
          </p>
        </header>

        {/* User Email */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">Email người dùng</label>
          <input
            className="border rounded-xl px-3 py-2 focus:outline-none focus:ring w-full"
            type="email"
            placeholder="you@company.com"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Flight select */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Chuyến bay</label>
              {selectedFlight && (
                <span className="text-xs text-gray-500">
                  Ghế trống: {selectedFlight.availableSeats}/{
                    selectedFlight.totalSeats
                  }
                </span>
              )}
            </div>
            <select
              className="border rounded-xl px-3 py-2 w-full bg-white"
              value={flightId}
              onChange={(e) => setFlightId(e.target.value)}
            >
              <option value="">-- Chọn chuyến bay --</option>
              {flights.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.id} (Còn {f.availableSeats})
                </option>
              ))}
            </select>
          </section>

          {/* Bus select */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Xe buýt (Biển số)</label>
              {selectedBus && (
                <span className="text-xs text-gray-500">
                  Ghế trống: {selectedBus.availableSeats}/{
                    selectedBus.totalSeats
                  }
                </span>
              )}
            </div>
            <select
              className="border rounded-xl px-3 py-2 w-full bg-white"
              value={busId}
              onChange={(e) => setBusId(e.target.value)}
            >
              <option value="">-- Chọn xe buýt --</option>
              {buses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id} (Còn {b.availableSeats})
                </option>
              ))}
            </select>
          </section>
        </div>

        {/* Seats */}
        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Số ghế muốn đặt</label>
            <input
              className="border rounded-xl px-3 py-2 w-full"
              type="number"
              min={1}
              value={seats}
              onChange={(e) => setSeats(Math.max(1, Number(e.target.value)))}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Ghi chú</label>
            <input
              className="border rounded-xl px-3 py-2 w-full"
              type="text"
              placeholder="(Tuỳ chọn) Ví dụ: cần ngồi gần cửa sổ"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleMockBook}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:opacity-90"
          >
            Đặt thử (mock)
          </button>
          <button
            onClick={() => {
              setFlightId("");
              setBusId("");
              setSeats(1);
            }}
            className="px-4 py-2 rounded-xl border"
          >
            Làm mới
          </button>
        </div>

        <hr className="my-2" />

        <details className="text-sm text-gray-600">
          <summary className="cursor-pointer font-medium">
            Hướng dẫn nối Firebase (tóm tắt)
          </summary>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>Cài SDK: <code>npm i firebase</code></li>
            <li>
              Tạo <code>firebase.js</code> với <code>initializeApp</code> và
              <code>getDatabase</code> (RTDB) hoặc <code>getFirestore</code>.
            </li>
            <li>
              Thay mock <code>flights/buses</code> bằng dữ liệu thật: dùng
              <code>onValue</code> (RTDB) hoặc <code>onSnapshot</code> (Firestore)
              để hiển thị ghế trống real-time.
            </li>
            <li>
              Khi đặt chỗ, dùng <code>runTransaction</code> để trừ ghế an toàn và
              tạo bản ghi vào <code>bookings</code>.
            </li>
          </ol>
        </details>
      </div>
    </div>
  );
}
