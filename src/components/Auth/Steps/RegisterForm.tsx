import { useState } from "react";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

/* Types */
import { StepAuth } from "../types";

/* MUI Icons */
import Visibility from "@mui/icons-material/VisibilityOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";
import CircularProgress from "@mui/material/CircularProgress";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

interface RegisterFormProps {
  handleComplete: (step: StepAuth) => void;
}

export default function RegisterForm(props: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
    resolver: zodResolver(schema), // to validate form fields by schema
  });

  // The password "eye" toggle button
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleToggleEye = () => {
    setIsShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      props.handleComplete(StepAuth.REGISTER);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="register-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="register-form__heading">Welcome to Chad</h2>
      <p className="register-form__desc">
        Go live in 10 minutes! Our self-service widget empowers your customers
        to manage orders and track shipments 24/7 without driving you crazy.
      </p>

      <div className="register-form__wrapper">
        <div>
          <div className="register-form__block">
            <label className="register-form__input-label" htmlFor="email">
              Email
            </label>
            <TextField
              className="register-form__input"
              id="email"
              type="email"
              variant="standard"
              placeholder="megachad@trychad.com"
              {...register("email")}
            />

            {errors.email && (
              <div className="register-form__message">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="register-form__block">
            <label className="register-form__input-label" htmlFor="name">
              Your name
            </label>
            <TextField
              className="register-form__input"
              id="name"
              type="text"
              variant="standard"
              placeholder="Mega Chad"
              {...register("name")}
            />

            {errors.name && (
              <div className="register-form__message">
                {errors.name.message}
              </div>
            )}
          </div>

          <div className="register-form__block">
            <label className="register-form__input-label" htmlFor="password">
              Password
            </label>
            <TextField
              className="register-form__input"
              id="password"
              type={isShowPassword ? "text" : "password"}
              variant="standard"
              placeholder="Enter password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleEye} edge="end">
                      {isShowPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password")}
            />

            {errors.password && (
              <div className="register-form__message">
                {errors.password.message}
              </div>
            )}
          </div>
        </div>

        <Button
          className="register-form__btn"
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Create account
          {isSubmitting && (
            <CircularProgress className="register-form__btn-loader" size={15} />
          )}
        </Button>

        <div className="register-form__addition">
          <span>
            Already have an account? <Link to="/">Login</Link>
          </span>
        </div>
      </div>
    </form>
  );
}
