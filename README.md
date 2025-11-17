# Mini Warehouse Website 🏭

A full-stack inventory management system built with **Node.js/Express** backend and **React** frontend.

## Features

✨ **Core Features:**
- ✅ Add, view, update, and delete warehouse items
- ✅ Real-time inventory dashboard with charts
- ✅ Item categorization and stock level tracking
- ✅ Low stock alerts
- ✅ PDF export functionality
- ✅ Smart inventory suggestions (ML-based)
- ✅ User authentication (Login/Signup)
- ✅ Activity logging

## Project Structure

```
warehouse-inventory/
├── warehouse-backend/          # Node.js Express server
│   ├── server.js              # Main server file
│   ├── routes/
│   │   └── items.js           # Item CRUD routes
│   ├── data/
│   │   └── db.json            # JSON database
│   ├── utils/
│   │   └── predictor.js       # ML predictions
│   └── package.json
│
├── warehouse-frontend/         # React application
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── components/
│   │   │   ├── api.js         # API client
│   │   │   ├── Dashboard.js
│   │   │   ├── ItemForm.js
│   │   │   ├── ItemList.js
│   │   │   └── SmartSuggestion.js
│   │   └── pages/
│   │       ├── InventoryPage.js
│   │       ├── DashboardPage.js
│   │       ├── Login.js
│   │       └── Signup.js
│   └── package.json
│
└── README.md                  # This file
```

## Tech Stack

**Backend:**
- Node.js
- Express.js
- JSON file database

**Frontend:**
- React
- Chart.js (for visualizations)
- jsPDF (for PDF export)
- CSS3

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

```bash
cd warehouse-backend
npm install
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd warehouse-frontend
npm install
npm start
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Items Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| POST | `/api/items` | Create new item |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |

### Request/Response Examples

**Create Item (POST /api/items):**
```json
{
  "name": "Laptop",
  "quantity": 10,
  "location": "Shelf A1",
  "category": "Electronics"
}
```

**Response:**
```json
{
  "id": 1700000000000,
  "name": "Laptop",
  "quantity": 10,
  "location": "Shelf A1",
  "category": "Electronics"
}
```

## Database

Data is stored in `warehouse-backend/data/db.json`:

```json
{
  "items": [
    {
      "id": 1700000000000,
      "name": "Item Name",
      "quantity": 100,
      "location": "Warehouse Location",
      "category": "Category"
    }
  ]
}
```

## Features Guide

### Dashboard
- View total items count
- Track number of categories
- Monitor low stock items
- Visual charts for inventory distribution

### Inventory Management
- Add new items with name, quantity, location, and category
- Search items by name
- Edit existing items
- Delete items
- Export inventory as PDF

### Smart Suggestions
- AI-powered recommendations for stock reordering
- Predictive analytics for inventory optimization

### User Authentication
- Secure login/signup
- Session management with localStorage

## Data Flow

```
Frontend Form 
  ↓
→ api.js (HTTP Request)
  ↓
→ Backend Route (/api/items)
  ↓
→ db.json (Persistent Storage)
  ↓
→ Dashboard/Pages (Read & Display)
```

## Common Issues & Solutions

### Issue: Backend won't start
```bash
# Clear node_modules and reinstall
cd warehouse-backend
rm -r node_modules
npm install
npm start
```

### Issue: Frontend won't connect to backend
- Ensure backend is running on `http://localhost:5000`
- Check `api.js` has correct base URL
- Verify CORS is enabled in server.js

### Issue: Data not saving
- Check `db.json` exists in `warehouse-backend/data/`
- Ensure backend has write permissions
- Verify network requests in browser DevTools

## Development

### Running Both Servers

**Terminal 1 - Backend:**
```bash
cd warehouse-backend && npm start
```

**Terminal 2 - Frontend:**
```bash
cd warehouse-frontend && npm start
```

### Code Structure

- **Frontend Components**: Located in `warehouse-frontend/src/components/`
- **API Wrapper**: `warehouse-frontend/src/components/api.js` handles all backend communication
- **Pages**: Located in `warehouse-frontend/src/pages/`

## Future Enhancements

- 📊 Advanced analytics and reporting
- 🔔 Email notifications for low stock
- 👥 Multi-user management
- 🔐 Advanced authentication (JWT)
- ☁️ Cloud database migration
- 📱 Mobile app version

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Author

**Mathan Kumar** - [GitHub](https://github.com/mathan10b)

## Support

For issues, questions, or suggestions, please create an issue on GitHub.

---

**Last Updated:** November 17, 2025
