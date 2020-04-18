import uuidv4 from 'uuid/v4'

const mutation = {
  createUser(parent, args, { db, pubsub }, info) {
    const emailTaken = db.users.some((user) => user.email === args.data.email)
    if (emailTaken) {
      throw new Error('Email taken')
    }
    const user = {
      id: uuidv4(),
      ...args.data
    }
    db.users.push(user)
    pubsub.publish('user', { 
      user: {
        mutation: 'CREATED',
        data: user
      }
    })
    return user
  },
  deleteUser(parent, args, { db, pubsub }, info) {
    const userIndex = db.users.findIndex(user => user.id === args.id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    const [user] = db.users.splice(userIndex, 1)
    pubsub.publish('user', { 
      user: {
        mutation: 'DELETED',
        data: user
      }
    })
    return user
  },
  updateUser(parent, { id, data }, { db, pubsub }, info) {
    const user = db.users.find(user => user.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === data.email)
      if (emailTaken) {
        throw new Error('Email in use')
      }
    }
    if (typeof data.name === 'string') {
      user.name = data.name
    }
    if (typeof data.age !== 'undefined') {
      user.age = data.age
    }
    pubsub.publish('user', { 
      user: {
        mutation: 'UPDATED',
        data: user
      }
    })
    return user
  }
}

export default mutation