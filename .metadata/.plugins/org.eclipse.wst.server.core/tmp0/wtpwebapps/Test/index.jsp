<%@ page language="java" contentType="text/html; charset=US-ASCII"
    pageEncoding="US-ASCII"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<% // Use of PersonBean in a JSP. %>

 
<html>
    <body>

        <br/>
        <form name="beanTest" method="POST" action="testPersonBean.jsp">
            Enter a name: <input type="text" name="name" size="50"><br/>
            Choose an option:
            <select name="deceased" form="testPersonBean.jsp">
                <option value="false">Alive</option>
                <option value="true">Dead</option>
            </select>
            <input type="submit" value="Test the Bean">
        </form>
    </body>
</html>