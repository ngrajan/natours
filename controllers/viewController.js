exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'All Tours',
  });
};

exports.getTour = (req, res) => {
  res.status(200).render('base', { tour: 'The Forest Hiker', user: 'Gokul' });
};
