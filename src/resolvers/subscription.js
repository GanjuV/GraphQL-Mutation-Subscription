const subscription = {
  user: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator('user')
    }
  }
}

export default subscription