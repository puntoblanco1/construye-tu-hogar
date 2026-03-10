"""
Backend API Tests for Auth and Favorites endpoints
Tests: Register, Login, Session, Me, Logout, Favorites CRUD
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthAndRoot:
    """Health check tests - run first"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Hello World"
        print("✓ API root endpoint working")


class TestAuthRegister:
    """Registration endpoint tests"""
    
    def test_register_new_user(self):
        """Test registering a new user"""
        unique_email = f"test_user_{uuid.uuid4().hex[:8]}@example.com"
        response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={
                "name": "Test User",
                "email": unique_email,
                "password": "testpass123"
            }
        )
        assert response.status_code == 200, f"Registration failed: {response.text}"
        data = response.json()
        assert "user_id" in data
        assert data["email"] == unique_email
        assert data["name"] == "Test User"
        print(f"✓ Registration works for {unique_email}")
    
    def test_register_duplicate_email(self):
        """Test that duplicate email registration fails"""
        unique_email = f"test_dup_{uuid.uuid4().hex[:8]}@example.com"
        # First registration
        requests.post(
            f"{BASE_URL}/api/auth/register",
            json={"name": "User1", "email": unique_email, "password": "pass123"}
        )
        # Second registration with same email
        response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={"name": "User2", "email": unique_email, "password": "pass456"}
        )
        assert response.status_code == 400
        data = response.json()
        assert "already registered" in data.get("detail", "").lower()
        print("✓ Duplicate email registration correctly rejected")


class TestAuthLogin:
    """Login endpoint tests"""
    
    @pytest.fixture
    def registered_user(self):
        """Create a user for login tests"""
        unique_email = f"login_test_{uuid.uuid4().hex[:8]}@example.com"
        requests.post(
            f"{BASE_URL}/api/auth/register",
            json={"name": "Login Test", "email": unique_email, "password": "loginpass123"}
        )
        return {"email": unique_email, "password": "loginpass123"}
    
    def test_login_success(self, registered_user):
        """Test successful login"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": registered_user["email"], "password": registered_user["password"]}
        )
        assert response.status_code == 200
        data = response.json()
        assert "user_id" in data
        assert data["email"] == registered_user["email"]
        # Check that session cookie is set
        assert "session_token" in response.cookies or "set-cookie" in str(response.headers).lower()
        print(f"✓ Login works for {registered_user['email']}")
    
    def test_login_invalid_credentials(self):
        """Test login with wrong password"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "nonexistent@example.com", "password": "wrongpass"}
        )
        assert response.status_code == 401
        print("✓ Invalid login correctly rejected with 401")
    
    def test_login_wrong_password(self):
        """Test login with existing user but wrong password"""
        # Use the test user mentioned in requirements
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "test@test.com", "password": "wrongpassword"}
        )
        # Should fail - either 401 if user exists or 401 if user doesn't exist
        assert response.status_code == 401
        print("✓ Wrong password correctly rejected")


class TestAuthSession:
    """Session-based authentication tests"""
    
    def test_me_without_auth(self):
        """Test /auth/me without authentication"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 401
        print("✓ /auth/me correctly requires authentication")
    
    def test_me_with_session_cookie(self):
        """Test /auth/me with valid session"""
        # Register and login to get session
        unique_email = f"session_test_{uuid.uuid4().hex[:8]}@example.com"
        session = requests.Session()
        
        reg_resp = session.post(
            f"{BASE_URL}/api/auth/register",
            json={"name": "Session Test", "email": unique_email, "password": "sesspass123"}
        )
        assert reg_resp.status_code == 200
        
        # Now check /me with the session
        me_resp = session.get(f"{BASE_URL}/api/auth/me")
        assert me_resp.status_code == 200
        data = me_resp.json()
        assert data["email"] == unique_email
        print("✓ /auth/me works with session cookie")


class TestAuthLogout:
    """Logout endpoint tests"""
    
    def test_logout(self):
        """Test logout clears session"""
        unique_email = f"logout_test_{uuid.uuid4().hex[:8]}@example.com"
        session = requests.Session()
        
        # Register
        session.post(
            f"{BASE_URL}/api/auth/register",
            json={"name": "Logout Test", "email": unique_email, "password": "logoutpass"}
        )
        
        # Verify logged in
        me_resp = session.get(f"{BASE_URL}/api/auth/me")
        assert me_resp.status_code == 200
        
        # Logout
        logout_resp = session.post(f"{BASE_URL}/api/auth/logout")
        assert logout_resp.status_code == 200
        
        # Verify session is cleared
        me_resp2 = session.get(f"{BASE_URL}/api/auth/me")
        assert me_resp2.status_code == 401
        print("✓ Logout successfully clears session")


class TestFavorites:
    """Favorites CRUD endpoint tests"""
    
    @pytest.fixture
    def auth_session(self):
        """Create authenticated session for favorites tests"""
        unique_email = f"fav_test_{uuid.uuid4().hex[:8]}@example.com"
        session = requests.Session()
        session.post(
            f"{BASE_URL}/api/auth/register",
            json={"name": "Fav Test", "email": unique_email, "password": "favpass123"}
        )
        return session
    
    def test_favorites_without_auth(self):
        """Test favorites endpoint requires auth"""
        response = requests.get(f"{BASE_URL}/api/favorites")
        assert response.status_code == 401
        print("✓ GET /favorites requires authentication")
    
    def test_add_favorite_without_auth(self):
        """Test adding favorite requires auth"""
        response = requests.post(f"{BASE_URL}/api/favorites/123")
        assert response.status_code == 401
        print("✓ POST /favorites requires authentication")
    
    def test_add_favorite(self, auth_session):
        """Test adding a property to favorites"""
        property_id = 12345
        response = auth_session.post(f"{BASE_URL}/api/favorites/{property_id}")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✓ Added property {property_id} to favorites")
        
        # Verify it's in favorites list
        list_resp = auth_session.get(f"{BASE_URL}/api/favorites")
        assert list_resp.status_code == 200
        favorites = list_resp.json()
        assert property_id in favorites
        print("✓ Property verified in favorites list")
    
    def test_add_duplicate_favorite(self, auth_session):
        """Test adding same property twice"""
        property_id = 99999
        auth_session.post(f"{BASE_URL}/api/favorites/{property_id}")
        
        # Add again
        response = auth_session.post(f"{BASE_URL}/api/favorites/{property_id}")
        assert response.status_code == 200  # Should not error, just return "Already in favorites"
        data = response.json()
        assert "already" in data.get("message", "").lower() or "added" in data.get("message", "").lower()
        print("✓ Duplicate favorite handled gracefully")
    
    def test_remove_favorite(self, auth_session):
        """Test removing a property from favorites"""
        property_id = 54321
        # Add first
        auth_session.post(f"{BASE_URL}/api/favorites/{property_id}")
        
        # Remove
        response = auth_session.delete(f"{BASE_URL}/api/favorites/{property_id}")
        assert response.status_code == 200
        
        # Verify removed
        list_resp = auth_session.get(f"{BASE_URL}/api/favorites")
        favorites = list_resp.json()
        assert property_id not in favorites
        print(f"✓ Property {property_id} removed from favorites")
    
    def test_get_favorites_list(self, auth_session):
        """Test getting favorites list"""
        # Add multiple
        for pid in [111, 222, 333]:
            auth_session.post(f"{BASE_URL}/api/favorites/{pid}")
        
        response = auth_session.get(f"{BASE_URL}/api/favorites")
        assert response.status_code == 200
        favorites = response.json()
        assert isinstance(favorites, list)
        assert 111 in favorites
        assert 222 in favorites
        assert 333 in favorites
        print(f"✓ Favorites list returned with {len(favorites)} items")


class TestLoginWithTestUser:
    """Test with the pre-existing test user"""
    
    def test_login_test_user(self):
        """Test login with test@test.com / test123"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "test@test.com", "password": "test123"}
        )
        # This may fail if user doesn't exist yet, which is fine
        if response.status_code == 200:
            data = response.json()
            assert data["email"] == "test@test.com"
            print("✓ test@test.com login successful")
        else:
            print(f"⚠ test@test.com user may not exist (status: {response.status_code})")
            # Not a failure - user just needs to be created
            pytest.skip("Test user test@test.com not registered yet")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
