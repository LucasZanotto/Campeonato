// app/Controllers/Http/TimeController.js

const Time = use('App/Models/Time')
const Database = use('Database');

class TimeController {
  async index({ response }) {
    const times = await Time.all()
    return response.json(times)
  }

  async store({ request, response }) {
    const data = request.only(['nome'])
    const time = await Time.create(data)
    return response.status(201).json(time)
  }


}

module.exports = TimeController
