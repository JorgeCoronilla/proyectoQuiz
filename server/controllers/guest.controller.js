const Guest = {
    join: async (req, res) => {
        try {
            res.send('Aquí está')
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
}

module.exports = {
    Guest
} 