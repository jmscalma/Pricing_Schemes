PGDMP  ;        
        
    |         
   calma_solx    17.2    17.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16388 
   calma_solx    DATABASE     �   CREATE DATABASE calma_solx WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE calma_solx;
                     postgres    false            X           1247    16390    pricimg_scheme_type    TYPE     ^   CREATE TYPE public.pricimg_scheme_type AS ENUM (
    'Variable-based',
    'Fixed Pricing'
);
 &   DROP TYPE public.pricimg_scheme_type;
       public               postgres    false            [           1247    16396    pricing_type_enum    TYPE     N   CREATE TYPE public.pricing_type_enum AS ENUM (
    'Fixed',
    'Variable'
);
 $   DROP TYPE public.pricing_type_enum;
       public               postgres    false            �            1255    16436 A   create_pricing_scheme(public.pricing_type_enum, numeric, integer)    FUNCTION     �  CREATE FUNCTION public.create_pricing_scheme(p_pricing_type public.pricing_type_enum, p_rate numeric, p_order_position integer) RETURNS TABLE(pricing_scheme_id integer, pricing_type public.pricing_type_enum, rate numeric, order_position integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
	INSERT INTO pricing_scheme (pricing_type, rate, order_position)
	VALUES (p_pricing_type, p_rate, p_order_position);
	
	RETURN QUERY
	SELECT * FROM pricing_scheme ORDER BY order_position ASC;
END;
$$;
    DROP FUNCTION public.create_pricing_scheme(p_pricing_type public.pricing_type_enum, p_rate numeric, p_order_position integer);
       public               postgres    false    859            �            1255    16472    delete_pricing_scheme(integer)    FUNCTION       CREATE FUNCTION public.delete_pricing_scheme(p_pricing_scheme_id integer) RETURNS TABLE(pricing_scheme_id integer, pricing_type public.pricing_type_enum, rate numeric, order_position integer)
    LANGUAGE plpgsql
    AS $$
DECLARE
    p_order_position INT;
BEGIN
    -- Assign order_position to the variable
    SELECT pricing_scheme.order_position
    INTO p_order_position
    FROM pricing_scheme
    WHERE pricing_scheme.pricing_scheme_id = p_pricing_scheme_id;

    -- Delete the row
    DELETE FROM pricing_scheme
    WHERE pricing_scheme.pricing_scheme_id = p_pricing_scheme_id;

    -- Update the order_position of the remaining rows
    UPDATE pricing_scheme
    SET order_position = pricing_scheme.order_position - 1
    WHERE pricing_scheme.order_position > p_order_position;

    -- Return the updated table
    RETURN QUERY
    SELECT pricing_scheme.pricing_scheme_id, pricing_scheme.pricing_type, pricing_scheme.rate, pricing_scheme.order_position
    FROM pricing_scheme
    ORDER BY pricing_scheme.order_position ASC;
END;
$$;
 I   DROP FUNCTION public.delete_pricing_scheme(p_pricing_scheme_id integer);
       public               postgres    false    859            �            1255    16443 '   delete_pricing_scheme(integer, integer)    FUNCTION     D  CREATE FUNCTION public.delete_pricing_scheme(p_pricing_scheme_id integer, p_order_position integer) RETURNS TABLE(pricing_scheme_id integer, pricing_type public.pricing_type_enum, rate numeric, order_position integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
	DELETE FROM pricing_scheme WHERE pricing_scheme.pricing_scheme_id = p_pricing_scheme_id;

 	UPDATE pricing_scheme SET order_position = pricing_scheme.order_position - 1 WHERE pricing_scheme.order_position > p_order_position;
	
	RETURN QUERY
	SELECT * FROM pricing_scheme ORDER BY pricing_scheme.order_position ASC;
END;
$$;
 c   DROP FUNCTION public.delete_pricing_scheme(p_pricing_scheme_id integer, p_order_position integer);
       public               postgres    false    859            �            1255    16442    get_all_pricing_scheme()    FUNCTION     ,  CREATE FUNCTION public.get_all_pricing_scheme() RETURNS TABLE(pricing_scheme_id integer, pricing_type public.pricing_type_enum, rate numeric, order_position integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
	RETURN QUERY
	SELECT * FROM pricing_scheme ORDER BY pricing_scheme.order_position ASC;
END;
$$;
 /   DROP FUNCTION public.get_all_pricing_scheme();
       public               postgres    false    859            �            1255    16462 #   test_delete_pricing_scheme(integer)    FUNCTION       CREATE FUNCTION public.test_delete_pricing_scheme(p_pricing_scheme_id integer) RETURNS TABLE(pricing_scheme_id integer, pricing_type public.pricing_type_enum, rate numeric, order_position integer)
    LANGUAGE plpgsql
    AS $$
DECLARE
    p_order_position INT;
BEGIN
    -- Assign order_position to the variable
    SELECT pricing_scheme.order_position
    INTO p_order_position
    FROM pricing_scheme
    WHERE pricing_scheme.pricing_scheme_id = p_pricing_scheme_id;

    -- Delete the row
    DELETE FROM pricing_scheme
    WHERE pricing_scheme.pricing_scheme_id = p_pricing_scheme_id;

    -- Update the order_position of the remaining rows
    UPDATE pricing_scheme
    SET order_position = pricing_scheme.order_position - 1
    WHERE pricing_scheme.order_position > p_order_position;

    -- Return the updated table
    RETURN QUERY
    SELECT pricing_scheme.pricing_scheme_id, pricing_scheme.pricing_type, pricing_scheme.rate, pricing_scheme.order_position
    FROM pricing_scheme
    ORDER BY pricing_scheme.order_position ASC;
END;
$$;
 N   DROP FUNCTION public.test_delete_pricing_scheme(p_pricing_scheme_id integer);
       public               postgres    false    859            �            1255    16471 A   update_pricing_scheme(integer, public.pricing_type_enum, numeric)    FUNCTION     �  CREATE FUNCTION public.update_pricing_scheme(p_pricing_scheme_id integer, p_pricing_type public.pricing_type_enum, p_rate numeric) RETURNS TABLE(pricing_scheme_id integer, pricing_type public.pricing_type_enum, rate numeric, order_position integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE pricing_scheme
	SET pricing_type = p_pricing_type,
		rate = p_rate
	WHERE pricing_scheme.pricing_scheme_id = p_pricing_scheme_id;
	
	RETURN QUERY
	SELECT * FROM pricing_scheme ORDER BY order_position ASC;
END;
$$;
 �   DROP FUNCTION public.update_pricing_scheme(p_pricing_scheme_id integer, p_pricing_type public.pricing_type_enum, p_rate numeric);
       public               postgres    false    859            �            1255    16439 0   update_pricing_scheme_position(integer, integer)    FUNCTION     �  CREATE FUNCTION public.update_pricing_scheme_position(p_pricing_scheme_id integer, p_new_order_position integer) RETURNS TABLE(pricing_scheme_id integer, pricing_type public.pricing_type_enum, rate numeric, order_position integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
 	UPDATE pricing_scheme SET order_position = p_new_order_position WHERE pricing_scheme.pricing_scheme_id = p_pricing_scheme_id;
	
	RETURN QUERY
	SELECT * FROM pricing_scheme ORDER BY pricing_scheme.order_position ASC;
END;
$$;
 p   DROP FUNCTION public.update_pricing_scheme_position(p_pricing_scheme_id integer, p_new_order_position integer);
       public               postgres    false    859            �            1255    16440 ,   update_pricing_scheme_rate(integer, numeric)    FUNCTION     �  CREATE FUNCTION public.update_pricing_scheme_rate(p_pricing_scheme_id integer, p_new_rate numeric) RETURNS TABLE(pricing_scheme_id integer, pricing_type public.pricing_type_enum, rate numeric, order_position integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
 	UPDATE pricing_scheme SET rate = p_new_rate WHERE pricing_scheme.pricing_scheme_id = p_pricing_scheme_id;
	
	RETURN QUERY
	SELECT * FROM pricing_scheme ORDER BY pricing_scheme.order_position ASC;
END;
$$;
 b   DROP FUNCTION public.update_pricing_scheme_rate(p_pricing_scheme_id integer, p_new_rate numeric);
       public               postgres    false    859            �            1255    16441 =   update_pricing_scheme_type(integer, public.pricing_type_enum)    FUNCTION     �  CREATE FUNCTION public.update_pricing_scheme_type(p_pricing_scheme_id integer, p_new_pricing_type public.pricing_type_enum) RETURNS TABLE(pricing_scheme_id integer, pricing_type public.pricing_type_enum, rate numeric, order_position integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
 	UPDATE pricing_scheme SET pricing_type = p_new_pricing_type WHERE pricing_scheme.pricing_scheme_id = p_pricing_scheme_id;
	
	RETURN QUERY
	SELECT * FROM pricing_scheme ORDER BY pricing_scheme.order_position ASC;
END;
$$;
 {   DROP FUNCTION public.update_pricing_scheme_type(p_pricing_scheme_id integer, p_new_pricing_type public.pricing_type_enum);
       public               postgres    false    859            �            1259    16427    pricing_scheme    TABLE       CREATE TABLE public.pricing_scheme (
    pricing_scheme_id integer NOT NULL,
    pricing_type public.pricing_type_enum NOT NULL,
    rate numeric NOT NULL,
    order_position integer,
    CONSTRAINT pricing_scheme_rate_check CHECK ((rate > (0)::numeric))
);
 "   DROP TABLE public.pricing_scheme;
       public         heap r       postgres    false    859            �            1259    16426 $   pricing_scheme_pricing_scheme_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pricing_scheme_pricing_scheme_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.pricing_scheme_pricing_scheme_id_seq;
       public               postgres    false    218            �           0    0 $   pricing_scheme_pricing_scheme_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.pricing_scheme_pricing_scheme_id_seq OWNED BY public.pricing_scheme.pricing_scheme_id;
          public               postgres    false    217            0           2604    16430     pricing_scheme pricing_scheme_id    DEFAULT     �   ALTER TABLE ONLY public.pricing_scheme ALTER COLUMN pricing_scheme_id SET DEFAULT nextval('public.pricing_scheme_pricing_scheme_id_seq'::regclass);
 O   ALTER TABLE public.pricing_scheme ALTER COLUMN pricing_scheme_id DROP DEFAULT;
       public               postgres    false    217    218    218            �          0    16427    pricing_scheme 
   TABLE DATA           _   COPY public.pricing_scheme (pricing_scheme_id, pricing_type, rate, order_position) FROM stdin;
    public               postgres    false    218   �-       �           0    0 $   pricing_scheme_pricing_scheme_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.pricing_scheme_pricing_scheme_id_seq', 83, true);
          public               postgres    false    217            3           2606    16435 "   pricing_scheme pricing_scheme_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.pricing_scheme
    ADD CONSTRAINT pricing_scheme_pkey PRIMARY KEY (pricing_scheme_id);
 L   ALTER TABLE ONLY public.pricing_scheme DROP CONSTRAINT pricing_scheme_pkey;
       public                 postgres    false    218            �   .   x��0�K,�LL�I�4�3�4�0�tˬHM�4�3�4����� �Ri     