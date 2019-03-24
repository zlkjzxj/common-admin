package com.xieke.admin;

import java.io.*;

/**
 * Created by walle
 * 2019/3/24 22:37
 * good good study,day day up!
 */
public class CopyFile {

    private static void copyFileUsingFileStreams(File source, File dest)
            throws IOException {
        InputStream input = null;
        OutputStream output = null;
        try {
            input = new FileInputStream(source);
            output = new FileOutputStream(dest);
            byte[] buf = new byte[1024];
            int bytesRead;
            while ((bytesRead = input.read(buf)) > 0) {
                output.write(buf, 0, bytesRead);
            }
        } finally {
            input.close();
            output.close();
        }

    }

    public static void main(String[] args) {
        try {
            String s = execute("ls /dev/meida/sunny");
            System.out.println(s);
//            copyFileUsingFileStreams(new File("D:/walle/a.jpg"), new File("E:/a.jpg"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String execute(String command) {
        String returnString = "";
        Process pro = null;
        Runtime runTime = Runtime.getRuntime();
        if (runTime == null) {
            System.err.println("Create runtime false!");
        }
        try {
            System.out.println("开始转换");
            pro = runTime.exec(command);
            BufferedReader input = new BufferedReader(new InputStreamReader(pro.getInputStream()));
            PrintWriter output = new PrintWriter(new OutputStreamWriter(pro.getOutputStream()));
            String line;
            while ((line = input.readLine()) != null) {
                System.out.println("line: " + line);
                returnString = returnString + line + "\n";
            }
            System.out.println("返回值:" + returnString);
            input.close();
            output.close();
            pro.destroy();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return returnString;
    }
}
