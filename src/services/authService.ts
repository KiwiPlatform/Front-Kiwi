// import axios from 'axios';

// const API_URL = 'http://your-api-url.com/api'; // This is now just a placeholder

const login = async (username: string, password: string) => {

    /*try {
        const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
          username,
          password,
        });
        // Assuming the server returns a token
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      } catch (error) {
        // Handle error (e.g., show a notification to the user)
        console.error('Login failed:', error);
        throw error;
      }*/

  console.log('Attempting login with:', { username, password });
  // Mock login logic
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'miriam' && password === 'password') {
        const mockUser = {
          user: {
            name: 'Miriam',
            first_surname: 'Bautista',
            email: 'moyola@autoplan.com.pe',
          },
          token: 'fake-jwt-token',
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(mockUser);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000); // 1-second delay to simulate network request
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService; 