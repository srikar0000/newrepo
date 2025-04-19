package com.example.web;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/products")
public class ProductServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><head><title>Products</title></head><body>");
        out.println("<h1>Available Products</h1>");
        out.println("<ul>");
        out.println("<li>Product One - $19.99</li>");
        out.println("<li>Product Two - $29.99</li>");
        out.println("</ul>");
        out.println("</body></html>");
        out.close();
    }
}