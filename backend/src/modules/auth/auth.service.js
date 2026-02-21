import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import authRepository from './auth.repository.js';

class AuthService {
  async login(email, password) {
    const user = await authRepository.findByEmail(email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (user.status !== 'active') {
      throw new Error('Account is inactive');
    }

    const isPasswordValid = await compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user.id, user.role);
    
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    };
  }

  async register(userData) {
    const { name, email, password, role } = userData;

    const existingUser = await authRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const saltRounds = 12;
    const passwordHash = await hash(password, saltRounds);

    const userId = await authRepository.create({
      name,
      email,
      passwordHash,
      role
    });

    const user = await authRepository.findById(userId);
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      created_at: user.created_at
    };
  }

  generateToken(userId, role) {
    return jwt.sign(
      { 
        userId, 
        role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

export default new AuthService();
