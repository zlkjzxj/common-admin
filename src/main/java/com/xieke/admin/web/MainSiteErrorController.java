package com.xieke.admin.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class MainSiteErrorController implements ErrorController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final static String ERROR_PATH = "error";

    /**
     * Supports the HTML Error View
     * @param request
     * @return
     */
    @RequestMapping(value = ERROR_PATH, produces = "text/html")
    public ModelAndView errorHtml(HttpServletRequest request, ModelAndView mav) {
        int status = this.getStatus(request).value();
        logger.error("error<<====================>>" + status);
        if (status == 404) {
            mav.setViewName(ERROR_PATH + "/404");
        } else if (status == 500) {
            mav.setViewName(ERROR_PATH + "/500");
        } else {
            mav.setViewName(ERROR_PATH + "/error");
        }
        return mav;
    }

    /**
     * 未授权页面
     * @return
     */
    @RequestMapping("/403")
    public String unauthorizedRole(){
        logger.info("------没有权限-------");
        return ERROR_PATH + "/403";
    }

    /**
     * Returns the path of the error page.
     *
     * @return the error path
     */
    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }

    private HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        if (statusCode != null) {
            try {
                return HttpStatus.valueOf(statusCode);
            }
            catch (Exception ex) {
            }
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

}