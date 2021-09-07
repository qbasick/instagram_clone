package org.qbasic.instagramclone.mapper;

public interface DtoConverter<T, U> {
    T convertToDto(U obj);
    U convertFromDto(T obj);
}
