'use strict'

const Time = use('App/Models/Time')

class TimeSeeder {
  async run () {
    await Time.create({ nome: 'Time A' })
    await Time.create({ nome: 'Time B' })
  }
}

module.exports = TimeSeeder
