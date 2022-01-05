const LoginForm = document.querySelector('.loginForm');

const join = async (req, res) => {
    const { name, username, email, password, password2 } = req.body;
    // const pageTitle = "Join";
    if (password !== password2) {
      return res.status(404).render({
        
        // errorMessage: "Password retry plz."
      });
    }
    const exists = await User.exists({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(404).render( {
        // errorMessage: "This username/email is boom."
      });
    }
    // try {
    //   await User.create({
    //     name,
    //     username,
    //     email,
    //     password,
    //     location
    //   });
    //   return res.redirect("/login");
    // } catch (error) {
    //   return res.status(400).render({
        
    //     errorMessage: error._message
    //   });
    // }
  }; 

LoginForm.addEventListener("submit", LoginForm);
