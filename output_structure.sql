--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: nosmile0110
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO nosmile0110;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: nosmile0110
--

COMMENT ON SCHEMA public IS '';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: NotificationType; Type: TYPE; Schema: public; Owner: nosmile0110
--

CREATE TYPE public."NotificationType" AS ENUM (
    'Announcement',
    'Message',
    'Interaction',
    'Warning'
);


ALTER TYPE public."NotificationType" OWNER TO nosmile0110;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Comment; Type: TABLE; Schema: public; Owner: nosmile0110
--

CREATE TABLE public."Comment" (
    id text NOT NULL,
    text text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "postsId" text NOT NULL,
    "userId" text NOT NULL,
    "parentId" text
);


ALTER TABLE public."Comment" OWNER TO nosmile0110;

--
-- Name: Follows; Type: TABLE; Schema: public; Owner: nosmile0110
--

CREATE TABLE public."Follows" (
    "followerId" text NOT NULL,
    "followingId" text NOT NULL
);


ALTER TABLE public."Follows" OWNER TO nosmile0110;

--
-- Name: Like; Type: TABLE; Schema: public; Owner: nosmile0110
--

CREATE TABLE public."Like" (
    id text NOT NULL,
    "postsId" text NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Like" OWNER TO nosmile0110;

--
-- Name: Notification; Type: TABLE; Schema: public; Owner: nosmile0110
--

CREATE TABLE public."Notification" (
    id text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL,
    "notifType" public."NotificationType" NOT NULL
);


ALTER TABLE public."Notification" OWNER TO nosmile0110;

--
-- Name: Picture; Type: TABLE; Schema: public; Owner: nosmile0110
--

CREATE TABLE public."Picture" (
    id text NOT NULL,
    "postsId" text NOT NULL,
    url text NOT NULL
);


ALTER TABLE public."Picture" OWNER TO nosmile0110;

--
-- Name: Post; Type: TABLE; Schema: public; Owner: nosmile0110
--

CREATE TABLE public."Post" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone,
    draft boolean DEFAULT false NOT NULL,
    content text,
    markdown boolean DEFAULT false NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Post" OWNER TO nosmile0110;

--
-- Name: Totp; Type: TABLE; Schema: public; Owner: nosmile0110
--

CREATE TABLE public."Totp" (
    id text NOT NULL,
    hash text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    attempts integer DEFAULT 0 NOT NULL,
    "expiresAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Totp" OWNER TO nosmile0110;

--
-- Name: User; Type: TABLE; Schema: public; Owner: nosmile0110
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    name text NOT NULL,
    "userName" text NOT NULL,
    email text NOT NULL,
    picture text,
    bio text
);


ALTER TABLE public."User" OWNER TO nosmile0110;

--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: Follows Follows_pkey; Type: CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerId", "followingId");


--
-- Name: Like Like_pkey; Type: CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_pkey" PRIMARY KEY (id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: Picture Picture_pkey; Type: CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Picture"
    ADD CONSTRAINT "Picture_pkey" PRIMARY KEY (id);


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- Name: Totp Totp_pkey; Type: CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Totp"
    ADD CONSTRAINT "Totp_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Comment_id_key; Type: INDEX; Schema: public; Owner: nosmile0110
--

CREATE UNIQUE INDEX "Comment_id_key" ON public."Comment" USING btree (id);


--
-- Name: Like_id_key; Type: INDEX; Schema: public; Owner: nosmile0110
--

CREATE UNIQUE INDEX "Like_id_key" ON public."Like" USING btree (id);


--
-- Name: Post_id_key; Type: INDEX; Schema: public; Owner: nosmile0110
--

CREATE UNIQUE INDEX "Post_id_key" ON public."Post" USING btree (id);


--
-- Name: Totp_hash_key; Type: INDEX; Schema: public; Owner: nosmile0110
--

CREATE UNIQUE INDEX "Totp_hash_key" ON public."Totp" USING btree (hash);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: nosmile0110
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_id_key; Type: INDEX; Schema: public; Owner: nosmile0110
--

CREATE UNIQUE INDEX "User_id_key" ON public."User" USING btree (id);


--
-- Name: User_userName_key; Type: INDEX; Schema: public; Owner: nosmile0110
--

CREATE UNIQUE INDEX "User_userName_key" ON public."User" USING btree ("userName");


--
-- Name: Comment Comment_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Comment Comment_postsId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comment Comment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Follows Follows_followerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Follows Follows_followingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Like Like_postsId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Like Like_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Notification Notification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Picture Picture_postsId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Picture"
    ADD CONSTRAINT "Picture_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nosmile0110
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: nosmile0110
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

