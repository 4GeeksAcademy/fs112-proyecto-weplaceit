import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { RequestResetPasswordForm } from "../components/RequestResetPasswordForm";

export const ForgotPassword = () => {
    return (
        <>
        <RequestResetPasswordForm/>
        </>
    )
}