module.exports = (router) => {
  router.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      status: 'running'
    })
  })
}
