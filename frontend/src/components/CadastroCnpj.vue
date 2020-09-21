<template>
  <div id="app" class="container">
    <b-alert
      show
      dismissible
      v-for="mensagem in mensagens"
      :key="mensagem.texto"
      :variant="mensagem.tipo"
    >{{mensagem.texto}}</b-alert>
    <b-card>
      <b-form-group label="Nome*">
        <b-form-input type="text" size="lg" v-model="usuario.nome" placeholder="Informe seu Nome"></b-form-input>
      </b-form-group>

      <b-form-group label="CNPJ*">
        <the-mask
          :mask="['##.###.###/####-##']"
          class="form-control display-7"
          v-model="usuario.cnpj"
          placeholder="Informe seu CNPJ"
        />
      </b-form-group>
      <b-form-group label="Email" id="input-group-1" label-for="input-1">
        <b-form-input
          type="email"
          size="lg"
          id="input-1"
          v-model="usuario.email"
          required="required"
          placeholder="Informe seu Email"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="CEP*">
        <the-mask
          :mask="['##.###.###']"
          class="form-control display-7"
          v-model="usuario.cep"
          placeholder="Informe seu CEP"
        />
      </b-form-group>
      <b-button @click="getLocation" size="lg" variant="primary">Carregar Mapa</b-button>
      <hr />
      <b-button @click="salvar" size="lg" variant="success">Enviar</b-button>
    </b-card>
    <hr />
  </div>
</template>

<script>
import axios from "axios";
import { TheMask } from "vue-the-mask";
export default {
  components: { TheMask },
  data() {
    return {
      mensagens: [],
      usuarios: [],
      id: null,
      usuario: {
        nome: "", //Obrigatorio
        cnpj: "", //Obrigatorio
        cnpj: "",
        email: "",
        cep: "",
      },
    };
  },
  methods: {
    limpar() {
      (this.usuario.nome = ""),
        (this.usuario.cnpj = ""),
        (this.usuario.cep = ""),
        (this.usuario.email = ""),
        (this.id = null);
      this.mensagens = [];
    },
    openFileDialog() {
      this.$refs.input.value = null;
      this.$refs.input.click();
    },
    handleFile({ target }) {
      this.usuario.img = target.files[0];
    },
    getLocation() {
      if(navigator.geolocation){
		  navigator.geolocation.getCurrentPosition(position => {
			  console.log(position.coords.latitude);
			  console.log(position.coords.longitude);
		  })
	  }
    },
    // getCarregarEndereco(lat, long) {
    //   axios
    //     .get(
    //       "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    //         lat +
    //         "," +
    //         long +
    //         "&key=yourkey"
    //     )
    //     .then((response) => {
	// 		if(response.data.error_messsage){
	// 			console.log(response.data.error_messsage);
	// 		} else {
	// 			console.log(response.data.results[0].formatted_adress);
	// 		}
	// 	})
    //     .catch((error) => {
    //       console.log(error.message);
    //     });
    // },

    //Adicionando usuarios - Metodo POST
    salvar() {
      const metodo = this.id ? "patch" : "post";
      const finalUrl = this.id ? `/${this.id}` : "";
      this.$http[metodo](
        `http://localhost:3001/usuarios${finalUrl}`,
        this.usuario
      ).then(() => {
        this.limpar();
        this.mensagens.push({
          texto: "Obrigado, cadastro realizado com sucesso",
          tipo: "success",
        });
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.5rem;
}

#app h1 {
  text-align: center;
  margin: 50px;
}
</style>
