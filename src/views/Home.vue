<template>
  <div class="Container">
    <div v-if="errorMessage" class="Alert">
      {{ errorMessage }}
    </div>
    <div class="Commands">

      <input v-model="cardsNumber" type="text" placeholder="Nombre de cartes">
      <button v-if="!clearable" @click="onClickSubmit">Recevoir une main</button>
      <button v-else @click="onClickClear">Rendre les cartes</button>
      <button v-if="hand.length > 0" @click="onClickSort">Trier la main</button>
      <div>
        <input id="checkbox1" v-model="corrupt" type="checkbox"/>
        <label aria-describedby="label" for="checkbox1" style="padding-right: 12px">Corrompre la requête<br/>(to trigger Alert from API response)</label>
      </div>
    </div>

    <transition-group class="Cards" name="cardgame" tag="div">
      <template v-for="card of hand">
        <card :key="card" :card="card"/>
      </template>
    </transition-group>
  </div>
</template>

<script>
import Card from '@/components/Card'
import axios from "axios";

export default {
  name: "Home",
  data: () => ({
    hand: [],
    cardsNumber: 10,
    errorMessage: '',
    clearable: false,
    corrupt: false,
  }),
  components: {
    Card
  },
  methods: {
    clearError() {
      this.errorMessage = ''
    },
    onClickClear() {
      this.hand = [];
      this.clearable = false
    },
    async onClickSubmit() {
      try {
        this.clearError()
        const params = {}
        if (!this.corrupt) {
          params.count = this.cardsNumber
        }
        const response = await axios({
          method: 'GET',
          url: 'cards',
          params
        })
        this.hand = response.data
        this.clearable = true
      } catch (err) {
        this.onError(err)
      }
    },
    async onClickSort() {
      try {
        this.clearError()
        const params = {
          hand: this.hand,
        }
        if (this.corrupt) {
          params.hand.push('11 Toronto')
        }
        const response = await axios({
          method: 'GET',
          url: 'cards/sort',
          params: {
            hand: this.hand,
          }
        })

        this.hand = {...response.data}
      } catch (err) {
        this.onError(err)
      }
    },
    onError(err) {
      this.onClickClear()
      if (err.response) {
        console.log(err.response)
        this.errorMessage = '' + err.response.status + ': ' + err.response.data.detail
      }
    },
  },
}
</script>

<style lang="css" scoped>

.Container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.Alert {
  padding: 20px;
  background-color: #f44336; /* Red */
  color: white;
  margin-bottom: 15px;
}

.Commands {
  padding-bottom: 24px;
}

.Commands input[type="text"] {
  width: 200px;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

.Commands button {
  padding: 12px;
  margin-left: 12px;
  cursor: pointer;
}

.Cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

}

.Card {
  transition: all 1s;
}

.cardgame-enter, .cardgame-leave-to
  /* .list-complete-leave-active below version 2.1.8 */
{
  opacity: 0;
  transform: translateY(30px);
}

.cardgame-active {
  position: absolute;
}

.cardgame-move {
  transition: transform 1s;
}
</style>
