const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

const DB_FILES = {
  users: path.join(DATA_DIR, 'users.json'),
  admins: path.join(DATA_DIR, 'admins.json'),
  schedules: path.join(DATA_DIR, 'schedules.json'),
  complaints: path.join(DATA_DIR, 'complaints.json')
};

// Initialize database files if they don't exist
async function initDB() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    for (const [key, filePath] of Object.entries(DB_FILES)) {
      try {
        await fs.access(filePath);
      } catch {
        await fs.writeFile(filePath, '[]');
      }
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Generic CRUD operations
async function readFile(collection) {
  try {
    const data = await fs.readFile(DB_FILES[collection], 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${collection}:`, error);
    return [];
  }
}

async function writeFile(collection, data) {
  try {
    await fs.writeFile(DB_FILES[collection], JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${collection}:`, error);
    return false;
  }
}

async function findById(collection, id) {
  const items = await readFile(collection);
  return items.find(item => item._id === id);
}

async function findOne(collection, query) {
  const items = await readFile(collection);
  return items.find(item => {
    return Object.keys(query).every(key => item[key] === query[key]);
  });
}

async function find(collection, query = {}) {
  const items = await readFile(collection);
  if (Object.keys(query).length === 0) return items;
  
  return items.filter(item => {
    return Object.keys(query).every(key => item[key] === query[key]);
  });
}

async function create(collection, data) {
  const items = await readFile(collection);
  const newItem = {
    _id: Date.now().toString(),
    ...data,
    createdAt: new Date().toISOString()
  };
  items.push(newItem);
  await writeFile(collection, items);
  return newItem;
}

async function updateById(collection, id, updates) {
  const items = await readFile(collection);
  const index = items.findIndex(item => item._id === id);
  
  if (index === -1) return null;
  
  items[index] = {
    ...items[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  await writeFile(collection, items);
  return items[index];
}

async function deleteById(collection, id) {
  const items = await readFile(collection);
  const filtered = items.filter(item => item._id !== id);
  
  if (filtered.length === items.length) return false;
  
  await writeFile(collection, filtered);
  return true;
}

async function countDocuments(collection, query = {}) {
  const items = await find(collection, query);
  return items.length;
}

module.exports = {
  initDB,
  readFile,
  writeFile,
  findById,
  findOne,
  find,
  create,
  updateById,
  deleteById,
  countDocuments
};
