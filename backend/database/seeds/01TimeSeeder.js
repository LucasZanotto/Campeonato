'use strict'

const Time = use('App/Models/Time')

class TimeSeeder {
  async run () {
    await Time.create({ nome: 'Time A' })
    await Time.create({ nome: 'Time B' })
    await Time.create({ nome: 'Time C' })
    await Time.create({ nome: 'Time D' })
    await Time.create({ nome: 'Time E' })
    await Time.create({ nome: 'Time F' })
    await Time.create({ nome: 'Time G' })
  }
}

module.exports = TimeSeeder
