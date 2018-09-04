<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index()
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/about-me", name="aboutMe")
     */
    public function about()
    {
        return $this->render('index/about-me.html.twig');
    }

    /**
     * @Route("/contact", name="contact")
     */
    public function contact()
    {
        return $this->render('index/contact.html.twig');
    }

    /**
     * @deprecated
     * @Route("/experiment", name="experiment")
     */
    public function experiment()
    {
        return $this->render('index/experiment.html.twig');
    }
}
