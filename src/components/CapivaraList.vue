<template>
  <div class="container">
    <h1 class="main-title">Anotações sobre as Capivaras (Hydrochoerus hydrochaeris)</h1>

    <!-- Filtro por Habitat e Botão Adicionar -->
    <div class="filter-add-container">
      <div class="filter">
        <label for="filter-habitat" class="filter-label">Filtrar por habitat:</label>
        <select id="filter-habitat" v-model="selectedHabitat" class="filter-select">
          <option value="Todos">Todos</option>
          <option value="Lago Sul">Lago Sul</option>
          <option value="Floresta Oeste">Floresta Oeste</option>
          <option value="Recinto Norte">Recinto Norte</option>
        </select>
      </div>
      <button class="btn-add" @click="abrirFormularioAdicao">
        {{ mostrarFormulario ? 'Fechar' : 'Adicionar Nova Capivara' }}
      </button>
    </div>

    <!-- Formulário de adição/edição de capivara -->
    <div v-if="mostrarFormulario" class="formulario">
      <h2>{{ isEditing ? 'Editar Capivara' : 'Adicionar Nova Capivara' }}</h2>
      <input v-model="capivaraEditando.Nome" placeholder="Nome" :disabled="isEditing" />
      <input v-model="capivaraEditando.Idade" placeholder="Idade" type="number" />
      <input v-model="capivaraEditando.Peso" placeholder="Peso" type="number" />
      <input v-model="capivaraEditando['Status de Saúde']" placeholder="Status de Saúde" />
      <input v-model="capivaraEditando.Habitat" placeholder="Habitat" />
      <input v-model="capivaraEditando.Comportamento" placeholder="Comportamento" />
      <input v-model="capivaraEditando.Dieta" placeholder="Dieta" />
      <input v-model="capivaraEditando.Observações" placeholder="Observações" />
      <button class="btn-save" @click="isEditing ? salvarCapivara() : adicionarCapivara()">
        {{ isEditing ? 'Salvar' : 'Adicionar' }}
      </button>
    </div>

    <!-- Listagem das capivaras -->
    <div class="capivara-list">
      <div v-for="capivara in capivarasFiltradas" :key="capivara.Nome" class="capivara-card">
        <h2>{{ capivara.Nome }}</h2>
        <div class="info-box">
          <p><strong>Idade:</strong> {{ capivara.Idade }} anos</p>
          <p><strong>Peso:</strong> {{ capivara.Peso }} kg</p>
          <p><strong>Status de Saúde:</strong> {{ capivara['Status de Saúde'] }}</p>
          <p><strong>Habitat:</strong> {{ capivara.Habitat }}</p>
        </div>
        <div class="info-box">
          <p><strong>Comportamento:</strong> {{ capivara.Comportamento }}</p>
          <p><strong>Dieta:</strong> {{ capivara.Dieta || 'Sem informações' }}</p>
          <p><strong>Observações:</strong> {{ capivara.Observações || 'Sem observações' }}</p>
        </div>
        <div class="btn-group">
          <button class="btn-edit" @click="editarCapivara(capivara)">Editar</button>
          <button class="btn-delete" @click="excluirCapivara(capivara.Nome)">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      capivaras: [],
      capivaraEditando: {
        Nome: '',
        Idade: '',
        Peso: '',
        'Status de Saúde': '',
        Habitat: '',
        Comportamento: '',
        Dieta: '',
        Observações: '',
      },
      mostrarFormulario: false,
      isEditing: false,
      selectedHabitat: 'Todos',
    };
  },
  computed: {
    capivarasFiltradas() {
      if (this.selectedHabitat === 'Todos') {
        return this.capivaras;
      }
      return Array.isArray(this.capivaras) 
        ? this.capivaras.filter((capivara) => capivara.Habitat === this.selectedHabitat)
        : [];
    },
  },
  created() {
    this.fetchCapivaras();
  },
  methods: {
    async fetchCapivaras() {
      try {
        const response = await axios.get('http://localhost:5001/api/capivaras');
        this.capivaras = Array.isArray(response.data) ? response.data : [];
        console.log("Capivaras carregadas:", this.capivaras);
      } catch (error) {
        console.error('Erro ao buscar capivaras:', error.response ? error.response.data : error.message);
      }
    },
    abrirFormularioAdicao() {
      this.mostrarFormulario = !this.mostrarFormulario;
      this.isEditing = false;
      this.limparFormulario();
    },
    limparFormulario() {
      this.capivaraEditando = {
        Nome: '',
        Idade: '',
        Peso: '',
        'Status de Saúde': '',
        Habitat: '',
        Comportamento: '',
        Dieta: '',
        Observações: '',
      };
    },
    async adicionarCapivara() {
      try {
        await axios.post('http://localhost:5001/api/capivaras', this.capivaraEditando);
        this.fetchCapivaras();
        this.mostrarFormulario = false;
        this.limparFormulario();
        console.log("Capivara adicionada com sucesso");
      } catch (error) {
        console.error('Erro ao adicionar capivara:', error.response ? error.response.data : error.message);
      }
    },
    async salvarCapivara() {
      try {
        await axios.put(`http://localhost:5001/api/capivaras/${this.capivaraEditando.Nome}`, this.capivaraEditando);
        this.isEditing = false;
        this.fetchCapivaras();
        this.mostrarFormulario = false;
        this.limparFormulario();
        console.log("Capivara salva com sucesso");
      } catch (error) {
        console.error('Erro ao salvar capivara:', error.response ? error.response.data : error.message);
      }
    },
    editarCapivara(capivara) {
      this.capivaraEditando = { ...capivara };
      this.mostrarFormulario = true;
      this.isEditing = true;
    },
    async excluirCapivara(nome) {
      try {
        await axios.delete(`http://localhost:5001/api/capivaras/${nome}`);
        this.fetchCapivaras();
        console.log("Capivara excluída com sucesso");
      } catch (error) {
        console.error('Erro ao excluir capivara:', error.response ? error.response.data : error.message);
      }
    },
  },
};
</script>

<style scoped>
.container {
  background-image: url("C:/Users/duart/Pictures/background.webp");
  background-position: center;
  padding-top: 0;
  margin-top: 0;
}

.main-title {
  font-family: 'Georgia', serif;
  color: #006400;
  font-size: 3em;
  text-align: center;
  margin-top: -30px;
  padding-bottom: 10px;
}

.filter-add-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.filter-label {
  font-weight: bold;
  font-size: 1.5em;
  color: #006400;
  font-family: 'Georgia', serif;
}

.filter-select, .btn-add {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  width: 220px;
  text-align: left;
}

.filter-select {
  padding-left: 10px;
  margin-left: 10px;
}

.btn-add {
  padding-left: 10px;
}

.capivara-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.capivara-card {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;
}

.capivara-card h2 {
  font-family: 'Georgia', serif;  /* Mesma fonte */
  color: #006400; /* Mesma cor verde */
  text-align: center; /* Centraliza o texto */
  font-size: 1.8em; /* Ajuste o tamanho da fonte */
}

.capivara-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.info-box {
  background-color: white;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 5px;
  text-align: left;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info-box p {
  margin-bottom: 2px;
  line-height: 1.0;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.btn-delete {
  background-color: #f44336;
}

.btn-delete:hover {
  background-color: #e53935;
}

.formulario input {
  font-family: 'Georgia', serif;
  color: #006400; /* Mesma cor verde */
  font-size: 16px; /* Tamanho da fonte ajustável */
  font-weight: bold; /* Negrito */
  width: 150px;
  padding: 5px;
}

.formulario h2 {
  font-family: 'Georgia', serif;
  color: #006400;
  font-size: 1.5em;
  font-weight: bold;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
