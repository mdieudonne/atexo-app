<template>
  <div class="Card">
    <div class="Suit">
      <component :is="getSuit" />
      <component :is="getSuit" />
    </div>
    <div class="Face">
        {{ getFace }}
    </div>
    <div class="Suit">
      <component :is="getSuit" />
      <component :is="getSuit" />
    </div>
  </div>
</template>

<script>
import Club from '@/components/icons/IconClub'
import Spade from '@/components/icons/IconSpade'
import Heart from '@/components/icons/IconHeart'
import Diamond from '@/components/icons/IconDiamond'

export default {
  name: 'Card',
  props: {
    card: String,
  },
  components: {
    Club,
    Spade,
    Heart,
    Diamond,
  },
  computed: {
    getFace() {
      return this.card.split(' ')[0]
    },
    getSuit() {
      return this.card.split(' ')[1]
    }
  }
}
</script>

<style scoped>
.Card {
  border: 2px solid #e7e7e7;
  border-radius: 4px;
  padding: 5px;
  margin: 5px;
  height: 176px;
  width: 126px;
  display: flex;
  flex-direction: column;
  background-color: azure;
}

.Card .Face {
  font-size: 48px;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}

.Card .Suit {
  height: 28px;
  vertical-align: middle;
  display: flex;
  justify-content: space-between;
}

</style>
