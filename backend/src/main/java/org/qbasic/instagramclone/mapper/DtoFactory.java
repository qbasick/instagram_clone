package org.qbasic.instagramclone.mapper;

import java.util.HashMap;
import java.util.Map;
/*
* Stores map of converters
* String name of converter should be identical to entity name
* 
* */
public class DtoFactory {
    Map<String, DtoConverter<?, ?>> converters = new HashMap<>();
    
    public void addConverter(String name, DtoConverter<?, ?> converter) {
        this.converters.putIfAbsent(name, converter);
    }
    
    public void removeConverter(String name) {
        this.converters.remove(name);
    }
    
    public DtoConverter<?, ?> getConverter(String name) {
        if (!this.converters.containsKey(name)) {
            throw new TypeNotPresentException(name, new Exception());
        }
        return this.converters.get(name);
    }
    
}
