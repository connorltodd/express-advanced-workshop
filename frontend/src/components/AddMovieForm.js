import React from "react";

function AddMovieForm(props) {
  const [newMovieData, setNewMovieData] = React.useState({
    color: 0,
    year: "",
    title: "",
    director: "",
    duration: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewMovieData({ ...newMovieData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createNewMovie(newMovieData);
    setNewMovieData({
      color: 0,
      year: "",
      title: "",
      director: "",
      duration: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="year"
          placeholder="year"
          onChange={handleChange}
          required
          value={newMovieData.year}
        />
        <br />
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={handleChange}
          required
          value={newMovieData.title}
        />
        <br />
        <input
          type="text"
          name="duration"
          placeholder="duration"
          onChange={handleChange}
          required
          value={newMovieData.duration}
        />
        <br />
        <input
          type="text"
          name="director"
          placeholder="director"
          onChange={handleChange}
          required
          value={newMovieData.director}
        />
        <br />
        <button>SUBMIT</button>
      </form>
    </div>
  );
}

export default AddMovieForm;
