const fs = require('fs');
const path = require('path');

const CATALOGUE = [
  { id: 1, brand: 'Phantom GT', model: 'V12 Apex Coupe', year: 2026, price: 189500, power: 623, zeroSixty: 3.4, fuel: 'Petrol', tag: 'Flagship', color: '#1a1a2e', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, brand: 'Nebula RS', model: 'Electric Hyper SUV', year: 2026, price: 145000, power: 750, zeroSixty: 2.8, fuel: 'EV', tag: 'Zero Emission', color: '#0e2f44', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, brand: 'Titan LX', model: 'Executive Sedan', year: 2025, price: 98000, power: 503, zeroSixty: 4.1, fuel: 'Hybrid', tag: 'Best Seller', color: '#3b2b1a', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80' },
  { id: 4, brand: 'Sabre ST', model: 'Track Edition', year: 2025, price: 132000, power: 580, zeroSixty: 3.2, fuel: 'Petrol', tag: 'Limited', color: '#3a1d1d', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80' },
  { id: 5, brand: 'Voltage E', model: 'Gran Coupe EV', year: 2026, price: 118000, power: 640, zeroSixty: 3.1, fuel: 'EV', tag: 'Zero Emission', color: '#14343c', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80' },
  { id: 6, brand: 'Grandia', model: 'Maybach Class', year: 2025, price: 210000, power: 550, zeroSixty: 4.4, fuel: 'Hybrid', tag: 'Flagship', color: '#24201c', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80' },
  { id: 7, brand: 'Aero GT3', model: 'Circuit Special', year: 2026, price: 168000, power: 615, zeroSixty: 2.9, fuel: 'Petrol', tag: 'Limited', color: '#3a1d2e', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80' },
  { id: 8, brand: 'Solaris 7', model: 'AWD Executive', year: 2025, price: 76000, power: 420, zeroSixty: 5.2, fuel: 'Hybrid', tag: 'Best Seller', color: '#1d2a3b', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80' },
];

const DATA_DIR = path.join(__dirname, '..', 'data');
const HUB_FILE = path.join(DATA_DIR, 'hub.json');

function readHub() {
  try {
    if (!fs.existsSync(HUB_FILE)) return { bookings: [], leads: [] };
    return JSON.parse(fs.readFileSync(HUB_FILE, 'utf-8'));
  } catch (err) {
    return { bookings: [], leads: [] };
  }
}

function writeHub(hub) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(HUB_FILE, JSON.stringify(hub, null, 2), 'utf-8');
}

function ok(res, data, message = 'success') {
  return res.status(200).json({ success: true, status: 200, message, data, timestamp: new Date().toISOString() });
}

const getAll = (req, res) => {
  let list = CATALOGUE;
  const { tag, fuel, max } = req.query;
  if (tag) list = list.filter((v) => v.tag.toLowerCase() === String(tag).toLowerCase());
  if (fuel) list = list.filter((v) => v.fuel.toLowerCase() === String(fuel).toLowerCase());
  if (max) list = list.filter((v) => v.price <= Number(max));
  return ok(res, list, 'vehicles fetched');
};

const getOne = (req, res) => {
  const vehicle = CATALOGUE.find((v) => v.id === Number(req.params.id));
  if (!vehicle) return res.status(404).json({ success: false, status: 404, message: 'Vehicle not found', data: null, timestamp: new Date().toISOString() });
  return ok(res, vehicle, 'vehicle fetched');
};

const bookTestDrive = (req, res) => {
  const { name, phone, model, date } = req.body || {};
  if (!name || !phone || !model) {
    return res.status(422).json({ success: false, status: 422, message: 'name, phone and model are required', data: null, timestamp: new Date().toISOString() });
  }
  const hub = readHub();
  const booking = { id: hub.bookings.length + 1, name: String(name).slice(0, 80), phone: String(phone).slice(0, 30), model: String(model).slice(0, 80), date: date || 'ASAP', status: 'new', createdAt: new Date().toISOString() };
  hub.bookings.push(booking);
  writeHub(hub);
  return res.status(201).json({ success: true, status: 201, message: 'test drive booked', data: booking, timestamp: new Date().toISOString() });
};

const submitInquiry = (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email) {
    return res.status(422).json({ success: false, status: 422, message: 'name and email are required', data: null, timestamp: new Date().toISOString() });
  }
  const hub = readHub();
  const lead = { id: hub.leads.length + 1, name: String(name).slice(0, 80), email: String(email).slice(0, 120), message: String(message || '').slice(0, 1000), createdAt: new Date().toISOString() };
  hub.leads.push(lead);
  writeHub(hub);
  return res.status(201).json({ success: true, status: 201, message: 'inquiry received', data: lead, timestamp: new Date().toISOString() });
};

const getBookings = (req, res) => ok(res, readHub().bookings, 'bookings fetched');
const getLeads = (req, res) => ok(res, readHub().leads, 'leads fetched');

module.exports = { getAll, getOne, bookTestDrive, submitInquiry, getBookings, getLeads, CATALOGUE };