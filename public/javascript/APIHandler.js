class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  // Fetch all characters
  async getFullList() {
    try {
      const response = await fetch(`${this.BASE_URL}/characters`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all characters:', error);
    }
  }

  // Fetch one character by ID
  async getOneRegister(id) {
    try {
      const response = await fetch(`${this.BASE_URL}/characters/${id}`);
      if (!response.ok) throw new Error('Character not found');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching character with id ${id}:`, error);
    }
  }

  // Create a new character
  async createOneRegister(character) {
    try {
      const response = await fetch(`${this.BASE_URL}/characters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(character),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating new character:', error);
    }
  }

  // Update an existing character
  async updateOneRegister(id, character) {
    try {
      const response = await fetch(`${this.BASE_URL}/characters/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(character),
      });
      if (!response.ok) throw new Error('Update failed');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating character with id ${id}:`, error);
    }
  }

  // Delete a character by ID
  async deleteOneRegister(id) {
    try {
      const response = await fetch(`${this.BASE_URL}/characters/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Delete failed');
      return response.status;
    } catch (error) {
      console.error(`Error deleting character with id ${id}:`, error);
    }
  }
}

