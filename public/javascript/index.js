const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  // Fetch all characters
  document.getElementById('fetch-all').addEventListener('click', async function () {
    try {
      const characters = await charactersAPI.getFullList();
      const container = document.querySelector('.characters-container');
      container.innerHTML = ''; // Clear previous characters

      characters.forEach(character => {
        const characterCard = `
          <div class="character-info">
            <div class="name">Name: ${character.name}</div>
            <div class="occupation">Occupation: ${character.occupation}</div>
            <div class="cartoon">Is a Cartoon? ${character.cartoon ? 'Yes' : 'No'}</div>
            <div class="weapon">Weapon: ${character.weapon}</div>
          </div>
        `;
        container.innerHTML += characterCard;
      });
    } catch (error) {
      console.error('Error fetching all characters:', error);
    }
  });

  // Fetch one character
  document.getElementById('fetch-one').addEventListener('click', async function () {
    const id = document.querySelector('input[name="character-id"]').value;
    try {
      const character = await charactersAPI.getOneRegister(id);
      const container = document.querySelector('.characters-container');
      container.innerHTML = ''; // Clear previous character info

      if (character) {
        const characterCard = `
          <div class="character-info">
            <div class="name">Name: ${character.name}</div>
            <div class="occupation">Occupation: ${character.occupation}</div>
            <div class="cartoon">Is a Cartoon? ${character.cartoon ? 'Yes' : 'No'}</div>
            <div class="weapon">Weapon: ${character.weapon}</div>
          </div>
        `;
        container.innerHTML = characterCard;
      } else {
        container.innerHTML = '<p>Character not found</p>';
      }
    } catch (error) {
      console.error(`Error fetching character with id ${id}:`, error);
    }
  });

  // Delete one character
  document.getElementById('delete-one').addEventListener('click', async function () {
    const id = document.querySelector('input[name="character-id-delete"]').value;
    try {
      await charactersAPI.deleteOneRegister(id);
      this.style.backgroundColor = 'green';
    } catch (error) {
      console.error(`Error deleting character with id ${id}:`, error);
      this.style.backgroundColor = 'red';
    }
  });

  // Create new character
  document.getElementById('new-character-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = this.querySelector('input[name="name"]').value;
    const occupation = this.querySelector('input[name="occupation"]').value;
    const weapon = this.querySelector('input[name="weapon"]').value;
    const cartoon = this.querySelector('input[name="cartoon"]').checked;

    try {
      await charactersAPI.createOneRegister({ name, occupation, weapon, cartoon });
      this.style.backgroundColor = 'green';
    } catch (error) {
      console.error('Error creating new character:', error);
      this.style.backgroundColor = 'red';
    }
  });

  // Edit character
  document.getElementById('edit-character-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const id = this.querySelector('input[name="chr-id"]').value;
    const name = this.querySelector('input[name="name"]').value;
    const occupation = this.querySelector('input[name="occupation"]').value;
    const weapon = this.querySelector('input[name="weapon"]').value;
    const cartoon = this.querySelector('input[name="cartoon"]').checked;

    try {
      await charactersAPI.updateOneRegister(id, { name, occupation, weapon, cartoon });
      this.style.backgroundColor = 'green';
    } catch (error) {
      console.error(`Error updating character with id ${id}:`, error);
      this.style.backgroundColor = 'red';
    }
  });
});
