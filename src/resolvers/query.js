const query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users
    }
    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase())
    })
  },
  me() {
    return {
      id: '123098',
      name: 'Mike',
      email: 'mike@example.com'
    }
  }
}

export default query