package com.xieke.admin;


import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @Description TODO
 * @Author sunny
 * @Date 2019-04-09 17:35
 */
public class Test {
    public static void main(String[] args) {
        List<String> cities = Arrays.asList("Milan",
                "London",
                "New York",
                "San Francisco");
        String citiesCommaSeparated = String.join(",", cities);
        System.out.println(citiesCommaSeparated);
        List<Integer> integers = new ArrayList<>();
        integers.add(1);
        integers.add(1);
        integers.add(1);
        integers.add(1);
        System.out.println(StringUtils.join(integers.toArray(), ","));
    }
}
