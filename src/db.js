const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/peerpair'

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB bağlantısı başarılı')
  })
  .catch((error) => {
    console.error('MongoDB bağlantı hatası:', error)
    process.exit(1)
  })

// User şeması
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Ad Soyad zorunludur']
  },
  email: {
    type: String,
    required: [true, 'E-posta zorunludur'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Şifre zorunludur']
  },
  faculty: {
    type: String,
    required: [true, 'Fakülte zorunludur']
  },
  grade: {
    type: Number,
    required: [true, 'Sınıf zorunludur']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Session şeması
const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Başlık zorunludur']
  },
  description: {
    type: String,
    required: [true, 'Açıklama zorunludur']
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  maxParticipants: {
    type: Number,
    default: 4
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Model oluşturma
const User = mongoose.model('User', userSchema)
const Session = mongoose.model('Session', sessionSchema)

module.exports = {
  User,
  Session,
  mongoose
} 