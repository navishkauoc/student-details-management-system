PGDMP                         z            student_details    14.4    14.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    16520    student_details    DATABASE     s   CREATE DATABASE student_details WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE student_details;
                postgres    false            ?            1259    16526    databasechangelog    TABLE     Y  CREATE TABLE public.databasechangelog (
    id character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    filename character varying(255) NOT NULL,
    dateexecuted timestamp without time zone NOT NULL,
    orderexecuted integer NOT NULL,
    exectype character varying(10) NOT NULL,
    md5sum character varying(35),
    description character varying(255),
    comments character varying(255),
    tag character varying(255),
    liquibase character varying(20),
    contexts character varying(255),
    labels character varying(255),
    deployment_id character varying(10)
);
 %   DROP TABLE public.databasechangelog;
       public         heap    postgres    false            ?            1259    16521    databasechangeloglock    TABLE     ?   CREATE TABLE public.databasechangeloglock (
    id integer NOT NULL,
    locked boolean NOT NULL,
    lockgranted timestamp without time zone,
    lockedby character varying(255)
);
 )   DROP TABLE public.databasechangeloglock;
       public         heap    postgres    false            ?            1259    16532    educational_detail    TABLE     F  CREATE TABLE public.educational_detail (
    id integer NOT NULL,
    end_date timestamp without time zone,
    grade character varying(255) NOT NULL,
    institute_name character varying(255) NOT NULL,
    qualification character varying(255) NOT NULL,
    started_date timestamp without time zone,
    student_id integer
);
 &   DROP TABLE public.educational_detail;
       public         heap    postgres    false            ?            1259    16531    educational_detail_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.educational_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.educational_detail_id_seq;
       public          postgres    false    212                       0    0    educational_detail_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.educational_detail_id_seq OWNED BY public.educational_detail.id;
          public          postgres    false    211            ?            1259    16541    student    TABLE     l  CREATE TABLE public.student (
    id integer NOT NULL,
    contact_number bigint NOT NULL,
    email character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    parent_contact_number bigint NOT NULL,
    parent_email character varying(255),
    parent_name character varying(255) NOT NULL
);
    DROP TABLE public.student;
       public         heap    postgres    false            ?            1259    16540    student_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.student_id_seq;
       public          postgres    false    214                       0    0    student_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.student_id_seq OWNED BY public.student.id;
          public          postgres    false    213            i           2604    16535    educational_detail id    DEFAULT     ~   ALTER TABLE ONLY public.educational_detail ALTER COLUMN id SET DEFAULT nextval('public.educational_detail_id_seq'::regclass);
 D   ALTER TABLE public.educational_detail ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            j           2604    16544 
   student id    DEFAULT     h   ALTER TABLE ONLY public.student ALTER COLUMN id SET DEFAULT nextval('public.student_id_seq'::regclass);
 9   ALTER TABLE public.student ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214                       0    16526    databasechangelog 
   TABLE DATA           ?   COPY public.databasechangelog (id, author, filename, dateexecuted, orderexecuted, exectype, md5sum, description, comments, tag, liquibase, contexts, labels, deployment_id) FROM stdin;
    public          postgres    false    210           ?          0    16521    databasechangeloglock 
   TABLE DATA           R   COPY public.databasechangeloglock (id, locked, lockgranted, lockedby) FROM stdin;
    public          postgres    false    209   -                  0    16532    educational_detail 
   TABLE DATA           z   COPY public.educational_detail (id, end_date, grade, institute_name, qualification, started_date, student_id) FROM stdin;
    public          postgres    false    212   R                  0    16541    student 
   TABLE DATA           ?   COPY public.student (id, contact_number, email, first_name, last_name, parent_contact_number, parent_email, parent_name) FROM stdin;
    public          postgres    false    214   ?!                  0    0    educational_detail_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.educational_detail_id_seq', 9, true);
          public          postgres    false    211                       0    0    student_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.student_id_seq', 6, true);
          public          postgres    false    213            l           2606    16525 0   databasechangeloglock databasechangeloglock_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.databasechangeloglock
    ADD CONSTRAINT databasechangeloglock_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.databasechangeloglock DROP CONSTRAINT databasechangeloglock_pkey;
       public            postgres    false    209            n           2606    16539 *   educational_detail educational_detail_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.educational_detail
    ADD CONSTRAINT educational_detail_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.educational_detail DROP CONSTRAINT educational_detail_pkey;
       public            postgres    false    212            p           2606    16548    student student_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.student DROP CONSTRAINT student_pkey;
       public            postgres    false    214            r           2606    16550 $   student uk_fe0i52si7ybu0wjedj6motiim 
   CONSTRAINT     `   ALTER TABLE ONLY public.student
    ADD CONSTRAINT uk_fe0i52si7ybu0wjedj6motiim UNIQUE (email);
 N   ALTER TABLE ONLY public.student DROP CONSTRAINT uk_fe0i52si7ybu0wjedj6motiim;
       public            postgres    false    214            s           2606    16551 .   educational_detail fkjulmxxwyit1ughegq3pu4oy23    FK CONSTRAINT     ?   ALTER TABLE ONLY public.educational_detail
    ADD CONSTRAINT fkjulmxxwyit1ughegq3pu4oy23 FOREIGN KEY (student_id) REFERENCES public.student(id);
 X   ALTER TABLE ONLY public.educational_detail DROP CONSTRAINT fkjulmxxwyit1ughegq3pu4oy23;
       public          postgres    false    212    214    3184                   x?????? ? ?      ?      x?3?L???"?=... U?         U  x?e??K?0şo??<*????_{K3?q??K?q??Z??Mf??B?p????Ap!??????8	?)??䓦ZJg³)?LH??9?1??g7?)MeY???ӝ?cgC1?	??d<`Mz~???0T][?T??b4Ǫ?Kzu???v????ER??M??I??h?Hb8<?!??u?/h?R?5??hNT??iK?ۄ????GG???;4?P?.}G{?lE?<i???Qz??>?޾??ĭ??
-I??ɹ?r?D}o???G?e?_??\ ?I|?(??HU]8??\???+$?Gp???!??>(??OT?]ֵ9?[w蚗6??ʻ?z??????-?           x?MP?N?0|v??_0)?iڷN???&!?#/?Mװ????|=?o????d?9?U??a??<R???G8??O)Dp???A?1?[?c??/?O??	km????S??>?8????\W???7+?7G???څ??Ww"???r?????Kd??jO??'??
?bY???MM??A-?d?x??J??p?^????Kt?1??FJ}??+???9uʂ?Ɩ:?%Q?6}?v?o?3????3?2?ū*?̢?4???M?^ ?rW?Ǡh?_??wJ?j?#     